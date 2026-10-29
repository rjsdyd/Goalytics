import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Team } from './entities/team.entity.js';
import { League } from './entities/league.entity.js';

@Injectable()
export class TeamsService implements OnModuleInit {
  private readonly logger = new Logger(TeamsService.name);

  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
    @InjectRepository(League)
    private leaguesRepository: Repository<League>,
    private configService: ConfigService,
  ) {}

async onModuleInit() {
    const leagueCount = await this.leaguesRepository.count();
    
    if (leagueCount === 0) {
      this.logger.log('DB에 데이터가 없습니다. 새로 가져옵니다...');
      await this.fetchAndSaveTeams();
    } else {
      this.logger.log(`이미 ${leagueCount}개의 리그 데이터가 존재합니다. API 호출을 건너뜁니다.`);
    }
  }

  async fetchAndSaveTeams() {
    const fdApiKey = this.configService.get<string>('FOOTBALL_API_KEY');
    const apiFApiKey = this.configService.get<string>('API_FOOTBALL_KEY');

    if (!fdApiKey || !apiFApiKey) return;

    // 💡 여기에 원하는 팀의 약자(TLA)를 키값으로 역대 기록을 계속 추가해 나가시면 됩니다!
    const manualStats: Record<string, any> = {
      'BOU': {
        scorers: [
          { name: '론 에어', stat: 229 },
          { name: '테드 맥두걸', stat: 142 },
          { name: '스티브 플레처', stat: 122 },
          { name: '제임스 헤이터', stat: 108 },
          { name: '브렛 피트먼', stat: 102 },
        ],
        assists: [
          { name: '라이언 프레이저', stat: 51 },
          { name: '마크 퓨', stat: 42 },
          { name: '찰리 다니엘스', stat: 38 },
          { name: '사이먼 프랜시스', stat: 36 },
          { name: '칼럼 윌슨', stat: 32 },
        ]
      },
      'ARS': {
        scorers: [
          { name: '티에리 앙리', stat: 228 },
          { name: '이안 라이트', stat: 185 },
          { name: '클리프 바스틴', stat: 178 },
          { name: '존 래드퍼드', stat: 149 },
          { name: '지미 브레인', stat: 139 },
        ],
        assists: [
          { name: '데니스 베르캄프', stat: 116 },
          { name: '티에리 앙리', stat: 103 },
          { name: '세스크 파브레가스', stat: 92 },
          { name: '메수트 외질', stat: 77 },
          { name: '시오 월콧', stat: 78 },
        ]
      },
      'AVL': {
        scorers: [
          { name: '빌리 워커', stat: 244 },
          { name: '해리 햄튼', stat: 227 },
          { name: '존 디비', stat: 187 },
          { name: '조 바체', stat: 185 },
          { name: '에릭 호튼', stat: 170 },
        ],
        assists: [
          { name: '애슐리 영', stat: 42 },
          { name: '가브리엘 아그본라허', stat: 34 },
          { name: '가레스 배리', stat: 31 },
          { name: '잭 그릴리쉬', stat: 28 },
          { name: '제임스 밀너', stat: 26 },
        ]
      },
      'BHA': {
        scorers: [
          { name: '토미 쿡', stat: 123 },
          { name: '글렌 머레이', stat: 111 },
          { name: '킷 네이피어', stat: 99 },
          { name: '피터 워드', stat: 95 },
          { name: '바비 자모라', stat: 90 },
        ],
        assists: [
          { name: '파스칼 그로스', stat: 52 },
          { name: '솔리 마치', stat: 33 },
          { name: '앤서니 녹카트', stat: 22 },
          { name: '글렌 머레이', stat: 20 },
          { name: '브루노 살토르', stat: 17 },
        ]
      },
      'CHE': {
        scorers: [
          { name: '프랭크 램파드', stat: 211 },
          { name: '바비 탬블링', stat: 202 },
          { name: '케리 딕슨', stat: 193 },
          { name: '디디에 드록바', stat: 164 },
          { name: '로이 벤틀리', stat: 150 },
        ],
        assists: [
          { name: '프랭크 램파드', stat: 150 },
          { name: '에덴 아자르', stat: 95 },
          { name: '디디에 드록바', stat: 86 },
          { name: '지안프랑코 졸라', stat: 80 },
          { name: '윌리안', stat: 62 },
        ]
      },
      'COV': {
        scorers: [
          { name: '클래리 부어튼', stat: 189 },
          { name: '조지 라우리', stat: 85 },
          { name: '디온 더블린', stat: 72 },
          { name: '이안 월러스', stat: 58 },
          { name: '시릴 레지스', stat: 52 },
        ],
        assists: [
          { name: '토미 허친슨', stat: 58 },
          { name: '구스타보 하머', stat: 24 },
          { name: '칼럼 오헤어', stat: 22 },
          { name: '대런 허커비', stat: 18 },
          { name: '게리 맥알리스터', stat: 16 },
        ]
      },
      'CRY': {
        scorers: [
          { name: '피터 심슨', stat: 165 },
          { name: '에드윈 스미스', stat: 124 },
          { name: '이안 라이트', stat: 117 },
          { name: '마크 브라이트', stat: 113 },
          { name: '윌프리드 자하', stat: 90 },
        ],
        assists: [
          { name: '윌프리드 자하', stat: 76 },
          { name: '야닉 볼라시에', stat: 30 },
          { name: '마이클 올리세', stat: 25 },
          { name: '제임스 맥아서', stat: 22 },
          { name: '제이슨 펀천', stat: 21 },
        ]
      },
      'EVE': {
        scorers: [
          { name: '딕시 딘', stat: 383 },
          { name: '그레엄 샤프', stat: 159 },
          { name: '밥 래치포드', stat: 138 },
          { name: '알렉스 영', stat: 125 },
          { name: '조 로일', stat: 119 },
        ],
        assists: [
          { name: '레이튼 베인스', stat: 67 },
          { name: '레온 오스만', stat: 36 },
          { name: '스티븐 피에나르', stat: 35 },
          { name: '미켈 아르테타', stat: 28 },
          { name: '케빈 미랄라스', stat: 27 },
        ]
      },
      'FUL': {
        scorers: [
          { name: '고든 데이비스', stat: 159 },
          { name: '조니 헤인즈', stat: 158 },
          { name: '베드포드 제저드', stat: 154 },
          { name: '그레이엄 레거트', stat: 134 },
          { name: '아서 스티븐스', stat: 124 },
        ],
        assists: [
          { name: '톰 케어니', stat: 54 },
          { name: '대니 머피', stat: 34 },
          { name: '루이스 보아 모르테', stat: 32 },
          { name: '클린트 뎀프시', stat: 21 },
          { name: '스티드 말브랑크', stat: 20 },
        ]
      },
      'HUL': {
        scorers: [
          { name: '크리스 칠튼', stat: 222 },
          { name: '켄 와그스태프', stat: 197 },
          { name: '패디 밀스', stat: 111 },
          { name: '존 에어', stat: 108 },
          { name: '앤디 플라운더스', stat: 105 },
        ],
        assists: [
          { name: '로버트 스노드그래스', stat: 29 },
          { name: '카밀 그로시츠키', stat: 27 },
          { name: '아흐메드 엘모하마디', stat: 25 },
          { name: '앤디 도슨', stat: 22 },
          { name: '닉 밤비', stat: 18 },
        ]
      },
      'IPS': {
        scorers: [
          { name: '레이 크로포드', stat: 218 },
          { name: '존 워크', stat: 190 },
          { name: '테드 필립스', stat: 181 },
          { name: '톰 가니스', stat: 143 },
          { name: '폴 마리너', stat: 135 },
        ],
        assists: [
          { name: '짐 매길튼', stat: 54 },
          { name: '대런 커리', stat: 38 },
          { name: '리프 데이비스', stat: 35 },
          { name: '프란스 티센', stat: 31 },
          { name: '카를로스 에드워즈', stat: 28 },
        ]
      },
      'LEE': {
        scorers: [
          { name: '피터 로리머', stat: 238 },
          { name: '존 찰스', stat: 157 },
          { name: '앨런 클라크', stat: 151 },
          { name: '믹 존스', stat: 111 },
          { name: '찰리 키틀리', stat: 110 },
        ],
        assists: [
          { name: '파블로 에르난데스', stat: 41 },
          { name: '이안 하트', stat: 36 },
          { name: '잭 해리슨', stat: 32 },
          { name: '리 보이어', stat: 25 },
          { name: '루크 아일링', stat: 21 },
        ]
      },
      'LIV': {
        scorers: [
          { name: '이안 러시', stat: 346 },
          { name: '로저 헌트', stat: 285 },
          { name: '고든 호지슨', stat: 241 },
          { name: '빌리 리델', stat: 228 },
          { name: '모하메드 살라', stat: 211 },
        ],
        assists: [
          { name: '스티븐 제라드', stat: 145 },
          { name: '모하메드 살라', stat: 89 },
          { name: '스티브 맥마나만', stat: 85 },
          { name: '트렌트 알렉산더-아놀드', stat: 83 },
          { name: '로베르토 피르미누', stat: 79 },
        ]
      },
      'MCI': {
        scorers: [
          { name: '세르히오 아구에로', stat: 260 },
          { name: '라힘 스털링', stat: 131 },
          { name: '케빈 더 브라위너', stat: 102 },
          { name: '콜 팔머', stat: 95 },
          { name: '필 포든', stat: 87 },
        ],
        assists: [
          { name: '케빈 더 브라위너', stat: 170 },
          { name: '다비드 실바', stat: 140 },
          { name: '라힘 스털링', stat: 95 },
          { name: '세르히오 아구에로', stat: 73 },
          { name: '리야드 마레즈', stat: 59 },
        ]
      },
      'MUN': {
        scorers: [
          { name: '웨인 루니', stat: 253 },
          { name: '바비 찰튼', stat: 249 },
          { name: '데니스 로', stat: 237 },
          { name: '잭 로울리', stat: 211 },
          { name: '데니스 바이올렛', stat: 179 },
        ],
        assists: [
          { name: '라이언 긱스', stat: 162 },
          { name: '웨인 루니', stat: 103 },
          { name: '데이비드 베컴', stat: 80 },
          { name: '에릭 칸토나', stat: 56 },
          { name: '폴 스콜스', stat: 55 },
        ]
      },
      'NEW': {
        scorers: [
          { name: '앨런 시어러', stat: 206 },
          { name: '재키 밀번', stat: 200 },
          { name: '렌 화이트', stat: 153 },
          { name: '휴이 갤러처', stat: 143 },
          { name: '말콤 맥도날드', stat: 121 },
        ],
        assists: [
          { name: '놀베르토 솔라노', stat: 54 },
          { name: '앨런 시어러', stat: 36 },
          { name: '로랑 로베르', stat: 32 },
          { name: '게리 스피드', stat: 26 },
          { name: '키에런 다이어', stat: 24 },
        ]
      },
      'NFO': {
        scorers: [
          { name: '그렌빌 모리스', stat: 217 },
          { name: '나이젤 클러프', stat: 131 },
          { name: '월리 아드론', stat: 124 },
          { name: '조니 덴트', stat: 122 },
          { name: '이안 스토리무어', stat: 118 },
        ],
        assists: [
          { name: '이안 우안', stat: 27 },
          { name: '브라이언 로이', stat: 17 },
          { name: '스튜어트 피어스', stat: 16 },
          { name: '모건 깁스화이트', stat: 15 },
          { name: '스티브 스톤', stat: 14 },
        ]
      },
      'SUN': {
        scorers: [
          { name: '바비 거니', stat: 228 },
          { name: '찰리 뷰컨', stat: 209 },
          { name: '데이브 할리데이', stat: 165 },
          { name: '조지 홀리', stat: 159 },
          { name: '케빈 필립스', stat: 130 },
        ],
        assists: [
          { name: '스티드 말브랑크', stat: 19 },
          { name: '세바스티안 라르손', stat: 19 },
          { name: '조던 헨더슨', stat: 13 },
          { name: '키에런 리처드슨', stat: 11 },
          { name: '켄와인 존스', stat: 10 },
        ]
      },
      'TOT': {
        scorers: [
          { name: '해리 케인', stat: 280 },
          { name: '지미 그리브스', stat: 266 },
          { name: '바비 스미스', stat: 208 },
          { name: '마틴 치버스', stat: 174 },
          { name: '손흥민', stat: 165 },
        ],
        assists: [
          { name: '대런 앤더튼', stat: 68 },
          { name: '크리스티안 에릭센', stat: 62 },
          { name: '손흥민', stat: 62 },
          { name: '해리 케인', stat: 50 },
          { name: '아론 레논', stat: 45 },
        ]
      },
      'RMA': {
        scorers: [
          { name: '크리스티아누 호날두', stat: 450 },
          { name: '카림 벤제마', stat: 354 },
          { name: '라울 곤살레스', stat: 323 },
          { name: '알프레도 디 스테파노', stat: 308 },
          { name: '산티야나', stat: 290 },
        ],
        assists: [
          { name: '카림 벤제마', stat: 165 },
          { name: '크리스티아누 호날두', stat: 131 },
          { name: '마르셀루', stat: 103 },
          { name: '토니 크로스', stat: 98 },
          { name: '루이스 피구', stat: 93 },
        ]
      },
      'ATH': {
        scorers: [
          { name: '텔모 사라', stat: 335 },
          { name: '바타', stat: 208 },
          { name: '다니', stat: 199 },
          { name: '기예르모 고로스티사', stat: 196 },
          { name: '호세 이라라고리', stat: 179 },
        ],
        assists: [
          { name: '마르켈 수사에타', stat: 75 },
          { name: '이케르 무니아인', stat: 70 },
          { name: '프란 예스테', stat: 60 },
          { name: '호세바 에체베리아', stat: 50 },
          { name: '아리츠 아두리스', stat: 35 },
        ]
      },
      'OSA': {
        scorers: [
          { name: '사비노 안도네기', stat: 127 },
          { name: '훌리안 베르가라', stat: 108 },
          { name: '파치 이리기벨', stat: 87 },
          { name: '로베르토 토레스', stat: 60 },
          { name: '얀 우르반', stat: 58 },
        ],
        assists: [
          { name: '로베르토 토레스', stat: 50 },
          { name: '파치 푸냘', stat: 40 },
          { name: '루벤 가르시아', stat: 35 },
          { name: '오이에르 산후르호', stat: 20 },
          { name: '키케 바르하', stat: 15 },
        ]
      },
      'ATL': {
        scorers: [
          { name: '앙투안 그리즈만', stat: 175 },
          { name: '루이스 아라고네스', stat: 172 },
          { name: '아드리안 에스쿠데로', stat: 169 },
          { name: '파코 캄포스', stat: 158 },
          { name: '호세 에울로히오 가라테', stat: 136 },
        ],
        assists: [
          { name: '코케', stat: 115 },
          { name: '앙투안 그리즈만', stat: 80 },
          { name: '가비', stat: 45 },
          { name: '야닉 카라스코', stat: 40 },
          { name: '아르다 투란', stat: 32 },
        ]
      },
      'ALA': {
        scorers: [
          { name: '마놀로 세라노', stat: 67 },
          { name: '하비 모레노', stat: 42 },
          { name: '호셀루', stat: 36 },
          { name: '루벤 나바로', stat: 33 },
          { name: '마그노 모셀린', stat: 27 },
        ],
        assists: [
          { name: '이바이 고메스', stat: 22 },
          { name: '루이스 리오하', stat: 18 },
          { name: '호니', stat: 15 },
          { name: '에드가르 멘데스', stat: 14 },
          { name: '루벤 두아르테', stat: 12 },
        ]
      },
      'ELC': {
        scorers: [
          { name: '니노', stat: 135 },
          { name: '피에리타', stat: 75 },
          { name: '바바', stat: 68 },
          { name: '로메로', stat: 55 },
          { name: '피델', stat: 40 },
        ],
        assists: [
          { name: '피델', stat: 30 },
          { name: '에두 알바카르', stat: 22 },
          { name: '호산', stat: 18 },
          { name: '코로', stat: 15 },
          { name: '테테 모렌테', stat: 12 },
        ]
      },
      'GET': {
        scorers: [
          { name: '호르헤 몰리나', stat: 52 },
          { name: '마누 델 모랄', stat: 39 },
          { name: '앙헬 로드리게스', stat: 36 },
          { name: '에네스 위날', stat: 34 },
          { name: '하이메 마타', stat: 32 },
        ],
        assists: [
          { name: '페드로 레온', stat: 25 },
          { name: '다미안 수아레스', stat: 20 },
          { name: '하비에르 카스케로', stat: 15 },
          { name: '하이메 가빌란', stat: 14 },
          { name: '파블로 사라비아', stat: 13 },
        ]
      },
      'LEV': {
        scorers: [
          { name: '호세 루이스 모랄레스', stat: 73 },
          { name: '로헤르 마르티', stat: 70 },
          { name: '파코 살리야스', stat: 52 },
          { name: '아루나 코네', stat: 15 },
          { name: '루벤 수아레스', stat: 14 },
        ],
        assists: [
          { name: '호세 캄파냐', stat: 30 },
          { name: '호세 루이스 모랄레스', stat: 30 },
          { name: '루벤 가르시아', stat: 15 },
          { name: '제이슨', stat: 12 },
          { name: '에니스 바르디', stat: 12 },
        ]
      },
      'MAL': {
        scorers: [
          { name: '델리 발데스', stat: 38 },
          { name: '살바 바예스타', stat: 34 },
          { name: '후안미', stat: 22 },
          { name: '산티 카솔라', stat: 14 },
          { name: '이스코', stat: 14 },
        ],
        assists: [
          { name: '두다', stat: 35 },
          { name: '산티 카솔라', stat: 15 },
          { name: '이스코', stat: 13 },
          { name: '헤수스 가메스', stat: 12 },
          { name: '나빌 바하', stat: 10 },
        ]
      },
      'RAY': {
        scorers: [
          { name: '미첼 I', stat: 67 },
          { name: '피티', stat: 52 },
          { name: '라울 데 토마스', stat: 45 },
          { name: '알바로 가르시아', stat: 30 },
          { name: '알베르토 부에노', stat: 28 },
        ],
        assists: [
          { name: '로베르토 트라쇼라스', stat: 35 },
          { name: '오스카르 트레호', stat: 30 },
          { name: '아드리안 엠바르바', stat: 25 },
          { name: '베베', stat: 15 },
          { name: '라스 방구라', stat: 15 },
        ]
      },
      'CEL': {
        scorers: [
          { name: '이아고 아스파스', stat: 204 },
          { name: '에르미디타', stat: 113 },
          { name: '블라도 구델', stat: 105 },
          { name: '파이뇨', stat: 91 },
          { name: '놀리토', stat: 39 },
        ],
        assists: [
          { name: '이아고 아스파스', stat: 75 },
          { name: '알렉산드르 모스토보이', stat: 55 },
          { name: '구스타보 로페스', stat: 45 },
          { name: '놀리토', stat: 35 },
          { name: '우고 마요', stat: 25 },
        ]
      },
      'DEP': {
        scorers: [
          { name: '디에고 트리스탄', stat: 110 },
          { name: '로이 마카이', stat: 97 },
          { name: '베베토', stat: 86 },
          { name: '리키', stat: 58 },
          { name: '자우밍야', stat: 38 },
        ],
        assists: [
          { name: '후안 카를로스 발레론', stat: 55 },
          { name: '프란', stat: 45 },
          { name: '빅토르 산체스', stat: 35 },
          { name: '자우밍야', stat: 30 },
          { name: '리오넬 스칼로니', stat: 20 },
        ]
      },
      'ESP': {
        scorers: [
          { name: '라울 타무도', stat: 140 },
          { name: '라파엘 마라뇬', stat: 111 },
          { name: '루이스 가르시아', stat: 47 },
          { name: '세르히오 가르시아', stat: 41 },
          { name: '제라르 모레노', stat: 36 },
        ],
        assists: [
          { name: '세르히오 가르시아', stat: 40 },
          { name: '이반 데 라 페냐', stat: 35 },
          { name: '빅토르 산체스', stat: 25 },
          { name: '루이스 가르시아', stat: 20 },
          { name: '마르코 아센시오', stat: 15 },
        ]
      },
      'BET': {
        scorers: [
          { name: '루벤 카스트로', stat: 148 },
          { name: '폴리 린콘', stat: 78 },
          { name: '호르헤 몰리나', stat: 77 },
          { name: '알폰소 페레스', stat: 69 },
          { name: '호아킨', stat: 52 },
        ],
        assists: [
          { name: '호아킨', stat: 95 },
          { name: '나빌 페키르', stat: 35 },
          { name: '세르히오 카날레스', stat: 30 },
          { name: '데니우송', stat: 20 },
          { name: '에두', stat: 15 },
        ]
      },
      'RAC': {
        scorers: [
          { name: '오스카르', stat: 54 },
          { name: '페드로 무니티스', stat: 30 },
          { name: '살바 바예스타', stat: 29 },
          { name: '니콜라 지기치', stat: 24 },
          { name: '곤살로 콜사', stat: 15 },
        ],
        assists: [
          { name: '페드로 무니티스', stat: 40 },
          { name: '파블로 피니요스', stat: 15 },
          { name: '오스카르 세라노', stat: 12 },
          { name: '케네디 바키르지올루', stat: 10 },
          { name: '메디 라센', stat: 8 },
        ]
      },
      'RSO': {
        scorers: [
          { name: '헤수스 마리아 사트루스테기', stat: 162 },
          { name: '다르코 코바체비치', stat: 107 },
          { name: '미켈 오야르사발', stat: 95 },
          { name: '사비 프리에토', stat: 73 },
          { name: '니하트 카베치', stat: 58 },
        ],
        assists: [
          { name: '사비 프리에토', stat: 55 },
          { name: '미켈 오야르사발', stat: 52 },
          { name: '카를로스 벨라', stat: 40 },
          { name: '하비에르 데 페드로', stat: 35 },
          { name: '앙투안 그리즈만', stat: 15 },
        ]
      },
      'SEV': {
        scorers: [
          { name: '기예르모 캄파날', stat: 218 },
          { name: '후안 아르사', stat: 204 },
          { name: '프레데릭 카누테', stat: 136 },
          { name: '루이스 파비아누', stat: 104 },
          { name: '알바로 네그레도', stat: 85 },
        ],
        assists: [
          { name: '헤수스 나바스', stat: 115 },
          { name: '이반 라키티치', stat: 55 },
          { name: '다니 알베스', stat: 40 },
          { name: '에베르 바네가', stat: 35 },
          { name: '파블로 사라비아', stat: 35 },
        ]
      },
      'VAL': {
        scorers: [
          { name: '에드문도 수아레스', stat: 269 },
          { name: '왈도 마차도', stat: 160 },
          { name: '마리오 켐페스', stat: 149 },
          { name: '페르난도 고메스', stat: 142 },
          { name: '다비드 비야', stat: 129 },
        ],
        assists: [
          { name: '다니 파레호', stat: 65 },
          { name: '비센테', stat: 45 },
          { name: '가이스카 멘디에타', stat: 35 },
          { name: '호아킨', stat: 30 },
          { name: '다비드 실바', stat: 30 },
        ]
      },
      'VIL': {
        scorers: [
          { name: '제라르 모레노', stat: 105 },
          { name: '주세페 로시', stat: 82 },
          { name: '디에고 포를란', stat: 59 },
          { name: '후안 로만 리켈메', stat: 45 },
          { name: '카를로스 바카', stat: 43 },
        ],
        assists: [
          { name: '산티 카솔라', stat: 55 },
          { name: '마누 트리게로스', stat: 45 },
          { name: '후안 로만 리켈메', stat: 40 },
          { name: '모이 고메스', stat: 30 },
          { name: '제라르 모레노', stat: 25 },
        ]
      },
      'MIL': {
        scorers: [
          { name: '군나르 노르달', stat: 221 },
          { name: '안드리 세브첸코', stat: 175 },
          { name: '잔니 리베라', stat: 164 },
          { name: '조제 알타피니', stat: 161 },
          { name: '알도 보피', stat: 131 },
        ],
        assists: [
          { name: '잔니 리베라', stat: 105 },
          { name: '카카', stat: 60 },
          { name: '클라렌스 세이도르프', stat: 55 },
          { name: '후이 코스타', stat: 50 },
          { name: '안드레아 피를로', stat: 45 },
        ]
      },
      'MON': {
        scorers: [
          { name: '브루노 다치', stat: 86 },
          { name: '파트리크 치우리아', stat: 20 },
          { name: '다니 모타', stat: 20 },
          { name: '안드레아 콜파니', stat: 15 },
          { name: '마테오 페시나', stat: 10 },
        ],
        assists: [
          { name: '파트리크 치우리아', stat: 15 },
          { name: '카를로스 아우구스투', stat: 10 },
          { name: '다니 모타', stat: 10 },
          { name: '마테오 페시나', stat: 8 },
          { name: '안드레아 콜파니', stat: 6 },
        ]
      },
      'FIO': {
        scorers: [
          { name: '가브리엘 바티스투타', stat: 203 },
          { name: '쿠르트 함린', stat: 208 },
          { name: '미겔 몬투오리', stat: 84 },
          { name: '잔카를로 안토뇨니', stat: 72 },
          { name: '루카 토니', stat: 57 },
        ],
        assists: [
          { name: '잔카를로 안토뇨니', stat: 60 },
          { name: '후이 코스타', stat: 50 },
          { name: '보르하 발레로', stat: 45 },
          { name: '마누엘 파스쿠알', stat: 40 },
          { name: '아드리안 무투', stat: 35 },
        ]
      },
      'ROM': {
        scorers: [
          { name: '프란체스코 토티', stat: 307 },
          { name: '로베르토 프루초', stat: 138 },
          { name: '에딘 제코', stat: 119 },
          { name: '아메데오 아마데이', stat: 111 },
          { name: '로돌포 폴크', stat: 106 },
        ],
        assists: [
          { name: '프란체스코 토티', stat: 197 },
          { name: '다니엘레 데 로시', stat: 54 },
          { name: '미랄렘 퍄니치', stat: 45 },
          { name: '주세페 잔니니', stat: 40 },
          { name: '로렌초 펠레그리니', stat: 35 },
        ]
      },
      'ATA': {
        scorers: [
          { name: '크리스티아노 도니', stat: 112 },
          { name: '두반 사파타', stat: 82 },
          { name: '알레한드로 고메스', stat: 59 },
          { name: '헤르만 데니스', stat: 56 },
          { name: '요시프 일리치치', stat: 56 },
        ],
        assists: [
          { name: '알레한드로 고메스', stat: 71 },
          { name: '요시프 일리치치', stat: 44 },
          { name: '크리스티아노 도니', stat: 40 },
          { name: '마르텐 더 룬', stat: 25 },
          { name: '레모 프로일러', stat: 25 },
        ]
      },
      'BOL': {
        scorers: [
          { name: '안젤로 스키아비오', stat: 251 },
          { name: '카를로 레구초니', stat: 168 },
          { name: '에치오 파스쿠티', stat: 142 },
          { name: '지노 피바텔리', stat: 105 },
          { name: '주세페 시뇨리', stat: 84 },
        ],
        assists: [
          { name: '로드리고 팔라시오', stat: 30 },
          { name: '리카르도 오르솔리니', stat: 25 },
          { name: '로베르토 바조', stat: 20 },
          { name: '무사 바로우', stat: 15 },
          { name: '로베르토 소리아노', stat: 15 },
        ]
      },
      'CAG': {
        scorers: [
          { name: '루이지 리바', stat: 208 },
          { name: '다비드 수아소', stat: 102 },
          { name: '루이지 피라스', stat: 87 },
          { name: '주앙 페드루', stat: 86 },
          { name: '로베르토 무치', stat: 64 },
        ],
        assists: [
          { name: '안드레아 코수', stat: 58 },
          { name: '주앙 페드루', stat: 25 },
          { name: '라자 나잉골란', stat: 20 },
          { name: '니콜로 바렐라', stat: 15 },
          { name: '다니엘레 콘티', stat: 15 },
        ]
      },
      'COM': {
        scorers: [
          { name: '안토니오 체티', stat: 91 },
          { name: '레나토 캄파니니', stat: 74 },
          { name: '비토리오 기안디', stat: 50 },
          { name: '마르코 로마노', stat: 45 },
          { name: '파트리크 쿠트로네', stat: 20 },
        ],
        assists: [
          { name: '알레산드로 가브리엘로니', stat: 10 },
          { name: '파트리크 쿠트로네', stat: 10 },
          { name: '루카스 다 쿠냐', stat: 8 },
          { name: '알레시오 이오비네', stat: 6 },
          { name: '세스크 파브레가스', stat: 5 },
        ]
      },
      'INT': {
        scorers: [
          { name: '주세페 메아차', stat: 284 },
          { name: '알레산드로 알토벨리', stat: 209 },
          { name: '로베르토 보닌세냐', stat: 171 },
          { name: '산드로 마촐라', stat: 160 },
          { name: '루이지 체베니니', stat: 158 },
        ],
        assists: [
          { name: '하비에르 사네티', stat: 65 },
          { name: '루이스 피구', stat: 50 },
          { name: '이반 페리시치', stat: 45 },
          { name: '데얀 스탄코비치', stat: 45 },
          { name: '마이콘', stat: 40 },
        ]
      },
      'FRO': {
        scorers: [
          { name: '다니엘 치오파니', stat: 77 },
          { name: '페데리코 디오니시', stat: 63 },
          { name: '카밀로 치아노', stat: 35 },
          { name: '루카 파가니니', stat: 28 },
          { name: '사무엘레 롱고', stat: 20 },
        ],
        assists: [
          { name: '카밀로 치아노', stat: 25 },
          { name: '다닐로 소디모', stat: 20 },
          { name: '페데리코 디오니시', stat: 15 },
          { name: '루카 파가니니', stat: 12 },
          { name: '다니엘 치오파니', stat: 10 },
        ]
      },
      'GEN': {
        scorers: [
          { name: '에도아르도 카토', stat: 92 },
          { name: '토마시 스쿠흐라비', stat: 59 },
          { name: '디에고 밀리토', stat: 59 },
          { name: '로드리고 팔라시오', stat: 38 },
          { name: '고란 판데프', stat: 32 },
        ],
        assists: [
          { name: '도메니코 크리시토', stat: 30 },
          { name: '로드리고 팔라시오', stat: 25 },
          { name: '고란 판데프', stat: 20 },
          { name: '토마시 스쿠흐라비', stat: 15 },
          { name: '이아고 팔케', stat: 12 },
        ]
      },
      'JUV': {
        scorers: [
          { name: '알레산드로 델 피에로', stat: 290 },
          { name: '잠피에로 보니페르티', stat: 179 },
          { name: '로베르토 베테가', stat: 178 },
          { name: '다비드 트레제게', stat: 171 },
          { name: '오마르 시보리', stat: 167 },
        ],
        assists: [
          { name: '알레산드로 델 피에로', stat: 150 },
          { name: '미셸 플라티니', stat: 100 },
          { name: '파벨 네드베드', stat: 60 },
          { name: '마우로 카모라네시', stat: 55 },
          { name: '지네딘 지단', stat: 50 },
        ]
      },
      'PAR': {
        scorers: [
          { name: '에르난 크레스포', stat: 94 },
          { name: '알레산드로 멜리', stat: 73 },
          { name: '알베르토 질라르디노', stat: 56 },
          { name: '엔리코 키에사', stat: 55 },
          { name: '잔프랑코 졸라', stat: 51 },
        ],
        assists: [
          { name: '잔프랑코 졸라', stat: 50 },
          { name: '안토니오 카사노', stat: 30 },
          { name: '토마스 브롤린', stat: 25 },
          { name: '데얀 쿨루셉스키', stat: 20 },
          { name: '후안 세바스티안 베론', stat: 20 },
        ]
      },
      'LAZ': {
        scorers: [
          { name: '치로 임모빌레', stat: 207 },
          { name: '실비오 피올라', stat: 159 },
          { name: '주세페 시뇨리', stat: 127 },
          { name: '조르조 키날리아', stat: 122 },
          { name: '브루노 조르다노', stat: 108 },
        ],
        assists: [
          { name: '루이스 알베르토', stat: 65 },
          { name: '세르게이 밀린코비치사비치', stat: 50 },
          { name: '세나드 룰리치', stat: 45 },
          { name: '스테파노 마우리', stat: 40 },
          { name: '치로 임모빌레', stat: 35 },
        ]
      },
      'NAP': {
        scorers: [
          { name: '드리스 메르텐스', stat: 148 },
          { name: '로렌초 인시녜', stat: 122 },
          { name: '마렉 함식', stat: 121 },
          { name: '디에고 마라도나', stat: 115 },
          { name: '에딘손 카바니', stat: 104 },
        ],
        assists: [
          { name: '마렉 함식', stat: 103 },
          { name: '로렌초 인시녜', stat: 95 },
          { name: '드리스 메르텐스', stat: 90 },
          { name: '호세 카예혼', stat: 79 },
          { name: '디에고 마라도나', stat: 60 },
        ]
      },
      'TOR': {
        scorers: [
          { name: '파올로 풀리치', stat: 172 },
          { name: '훌리오 리보나티', stat: 150 },
          { name: '지노 로세티', stat: 144 },
          { name: '굴리엘모 가베토', stat: 127 },
          { name: '안드레아 벨로티', stat: 113 },
        ],
        assists: [
          { name: '안드레아 벨로티', stat: 28 },
          { name: '알레시오 체르치', stat: 20 },
          { name: '크리스티안 안살디', stat: 15 },
          { name: '사샤 루키치', stat: 12 },
          { name: '이아고 팔케', stat: 10 },
        ]
      },
      'UDI': {
        scorers: [
          { name: '안토니오 디 나탈레', stat: 227 },
          { name: '로렌초 베티니', stat: 67 },
          { name: '빈첸초 이아퀸타', stat: 64 },
          { name: '올리버 비어호프', stat: 62 },
          { name: '로드리고 데 파울', stat: 34 },
        ],
        assists: [
          { name: '안토니오 디 나탈레', stat: 70 },
          { name: '로드리고 데 파울', stat: 36 },
          { name: '로베르토 페레이라', stat: 30 },
          { name: '알렉시스 산체스', stat: 20 },
          { name: '가에타노 다고스티노', stat: 15 },
        ]
      },
      'LEC': {
        scorers: [
          { name: '하비에르 체반톤', stat: 47 },
          { name: '미르코 부치니치', stat: 34 },
          { name: '페드로 파스쿨리', stat: 29 },
          { name: '크리스티아노 루카렐리', stat: 27 },
          { name: '가브리엘 스트레페차', stat: 15 },
        ],
        assists: [
          { name: '기예르모 자코마치', stat: 20 },
          { name: '모르텐 히울만', stat: 10 },
          { name: '마르코 만코수', stat: 10 },
          { name: '가브리엘 스트레페차', stat: 10 },
          { name: '레미 우댕', stat: 8 },
        ]
      },
      'SAS': {
        scorers: [
          { name: '도메니코 베라르디', stat: 133 },
          { name: '프란체스코 카푸토', stat: 32 },
          { name: '그레고르 데프렐', stat: 32 },
          { name: '시모네 차차', stat: 21 },
          { name: '자코모 라스파도리', stat: 18 },
        ],
        assists: [
          { name: '도메니코 베라르디', stat: 85 },
          { name: '아르망 로리앙테', stat: 15 },
          { name: '제레미 보가', stat: 10 },
          { name: '필립 주리치치', stat: 10 },
          { name: '프란체스코 마냐넬리', stat: 10 },
        ]
      },
      'VEN': {
        scorers: [
          { name: '필리포 마니에로', stat: 54 },
          { name: '알바로 레코바', stat: 11 },
          { name: '토마 앙리', stat: 9 },
          { name: '데이비드 오케레케', stat: 7 },
          { name: '마티아 아라무', stat: 7 },
        ],
        assists: [
          { name: '마티아 아라무', stat: 10 },
          { name: '알바로 레코바', stat: 8 },
          { name: '잔루카 부시오', stat: 5 },
          { name: '데니스 욘센', stat: 5 },
          { name: '토마 앙리', stat: 3 },
        ]
      },'KOE': {
        scorers: [
          { name: '하네스 뢰어', stat: 166 },
          { name: '디터 뮐러', stat: 159 },
          { name: '피에르 리트바르스키', stat: 116 },
          { name: '루카스 포돌스키', stat: 86 },
          { name: '밀리보예 노바코비치', stat: 74 },
        ],
        assists: [
          { name: '요나스 헥터', stat: 35 },
          { name: '플로리안 카인츠', stat: 30 },
          { name: '마르셀 리세', stat: 25 },
          { name: '루카스 포돌스키', stat: 20 },
          { name: '크리스티안 클레멘스', stat: 18 },
        ]
      },
      'UNB': {
        scorers: [
          { name: '타이워 아워니이', stat: 20 },
          { name: '셰랄도 베커르', stat: 18 },
          { name: '막스 크루제', stat: 16 },
          { name: '케빈 베렌스', stat: 14 },
          { name: '제바스티안 폴터', stat: 12 },
        ],
        assists: [
          { name: '크리스토퍼 트리멜', stat: 32 },
          { name: '셰랄도 베커르', stat: 15 },
          { name: '막스 크루제', stat: 10 },
          { name: '니코 기셀만', stat: 8 },
          { name: '마르쿠스 잉바르트센', stat: 7 },
        ]
      },
      'M05': {
        scorers: [
          { name: '카림 오니시워', stat: 33 },
          { name: '로빈 콰이손', stat: 31 },
          { name: '유누스 말리', stat: 29 },
          { name: '장필리프 마테타', stat: 24 },
          { name: '요시노리 무토', stat: 20 },
        ],
        assists: [
          { name: '다니엘 브로진스키', stat: 35 },
          { name: '장폴 보에티우스', stat: 22 },
          { name: '카림 오니시워', stat: 20 },
          { name: '유누스 말리', stat: 15 },
          { name: '레빈 외즈투날리', stat: 14 },
        ]
      },
      'B04': {
        scorers: [
          { name: '울프 키르스텐', stat: 181 },
          { name: '슈테판 키슬링', stat: 131 },
          { name: '케빈 폴란트', stat: 44 },
          { name: '디미타르 베르바토프', stat: 69 },
          { name: '플로리안 비르츠', stat: 35 },
        ],
        assists: [
          { name: '곤살로 카스트로', stat: 68 },
          { name: '슈테판 키슬링', stat: 55 },
          { name: '율리안 브란트', stat: 40 },
          { name: '플로리안 비르츠', stat: 35 },
          { name: '베른트 슈나이더', stat: 35 },
        ]
      },
      'BVB': {
        scorers: [
          { name: '마르코 로이스', stat: 120 },
          { name: '미하엘 초르크', stat: 131 },
          { name: '만프레트 부르크스뮐러', stat: 135 },
          { name: '피에르에메릭 오바메양', stat: 98 },
          { name: '로베르트 레반도프스키', stat: 74 },
        ],
        assists: [
          { name: '마르코 로이스', stat: 93 },
          { name: '제이든 산초', stat: 55 },
          { name: '마리오 괴체', stat: 52 },
          { name: '하파엘 게레이루', stat: 40 },
          { name: '우카시 피슈체크', stat: 38 },
        ]
      },
      'BMG': {
        scorers: [
          { name: '유프 하인케스', stat: 195 },
          { name: '알란 시몬센', stat: 76 },
          { name: '라스 슈틴들', stat: 62 },
          { name: '마르코 로이스', stat: 36 },
          { name: '알라산 플레아', stat: 45 },
        ],
        assists: [
          { name: '패트릭 헤르만', stat: 45 },
          { name: '라스 슈틴들', stat: 35 },
          { name: '요나스 호프만', stat: 32 },
          { name: '알라산 플레아', stat: 30 },
          { name: '마르코 로이스', stat: 25 },
        ]
      },
      'SGE': {
        scorers: [
          { name: '베른트 횔첸바인', stat: 160 },
          { name: '베른트 니켈', stat: 141 },
          { name: '알렉산더 마이어', stat: 119 },
          { name: '안토니 예보아', stat: 68 },
          { name: '안드레 실바', stat: 40 },
        ],
        assists: [
          { name: '필립 코스티치', stat: 55 },
          { name: '다이치 카마다', stat: 25 },
          { name: '알렉산더 마이어', stat: 20 },
          { name: '제바스티안 로데', stat: 15 },
          { name: '안테 레비치', stat: 12 },
        ]
      },
      'FCA': {
        scorers: [
          { name: '알프레드 핀보가손', stat: 37 },
          { name: '플로리안 니더레흐너', stat: 23 },
          { name: '안드레 한', stat: 21 },
          { name: '토비아스 베르너', stat: 19 },
          { name: '미하엘 그레고리치', stat: 15 },
        ],
        assists: [
          { name: '다니엘 바이어', stat: 25 },
          { name: '필립 막스', stat: 23 },
          { name: '토비아스 베르너', stat: 15 },
          { name: '요나탄 슈미트', stat: 14 },
          { name: '알프레드 핀보가손', stat: 10 },
        ]
      },
      'FCB': {
        scorers: [
          { name: '게르트 뮐러', stat: 365 },
          { name: '로베르트 레반도프스키', stat: 238 },
          { name: '토마스 뮐러', stat: 145 },
          { name: '카를하인츠 루메니게', stat: 162 },
          { name: '롤란트 볼파르트', stat: 119 },
        ],
        assists: [
          { name: '토마스 뮐러', stat: 165 },
          { name: '프랑크 리베리', stat: 103 },
          { name: '아르옌 로벤', stat: 75 },
          { name: '바스티안 슈바인슈타이거', stat: 55 },
          { name: '요주아 키미히', stat: 50 },
        ]
      },
      'S04': {
        scorers: [
          { name: '클라우스 피셔', stat: 182 },
          { name: '클라스얀 휜텔라르', stat: 82 },
          { name: '케빈 쿠라니', stat: 71 },
          { name: '에베 산', stat: 73 },
          { name: '마르크 빌모츠', stat: 27 },
        ],
        assists: [
          { name: '제페르손 파르판', stat: 50 },
          { name: '율리안 드락슬러', stat: 30 },
          { name: '크리스티안 판더', stat: 20 },
          { name: '레온 고레츠카', stat: 15 },
          { name: '마이어', stat: 15 },
        ]
      },
      'HSV': {
        scorers: [
          { name: '우베 젤러', stat: 137 },
          { name: '토마스 돌', stat: 39 },
          { name: '라파엘 판데르파르트', stat: 45 },
          { name: '이비차 올리치', stat: 29 },
          { name: '손흥민', stat: 20 },
        ],
        assists: [
          { name: '메흐디 마다비키아', stat: 50 },
          { name: '라파엘 판데르파르트', stat: 40 },
          { name: '표트르 트로호프스키', stat: 30 },
          { name: '손흥민', stat: 10 },
          { name: '무라덴 페트리치', stat: 15 },
        ]
      },
      'RBL': {
        scorers: [
          { name: '티모 베르너', stat: 89 },
          { name: '크리스토퍼 은쿤쿠', stat: 47 },
          { name: '유수프 포울센', stat: 43 },
          { name: '마르셀 자비처', stat: 32 },
          { name: '에밀 포르스베리', stat: 28 },
        ],
        assists: [
          { name: '에밀 포르스베리', stat: 45 },
          { name: '크리스토퍼 은쿤쿠', stat: 36 },
          { name: '티모 베르너', stat: 35 },
          { name: '다니 올모', stat: 25 },
          { name: '마르셀 자비처', stat: 25 },
        ]
      },
      'SCF': {
        scorers: [
          { name: '닐스 페테르센', stat: 69 },
          { name: '파피스 시세', stat: 37 },
          { name: '빈첸초 그리포', stat: 55 },
          { name: '크리스티안 귄터', stat: 10 },
          { name: '루카스 횔러', stat: 20 },
        ],
        assists: [
          { name: '크리스티안 귄터', stat: 45 },
          { name: '빈첸초 그리포', stat: 45 },
          { name: '니콜라스 회플러', stat: 15 },
          { name: '요나탄 슈미트', stat: 15 },
          { name: '막시밀리안 에게슈타인', stat: 10 },
        ]
      },
      'SCP': {
        scorers: [
          { name: '모리츠 슈토펠캄프', stat: 12 },
          { name: '스벤 미셸', stat: 10 },
          { name: '데니스 스르베니', stat: 8 },
          { name: '필립 클레멘트', stat: 5 },
          { name: '말론 리터', stat: 4 },
        ],
        assists: [
          { name: '모리츠 슈토펠캄프', stat: 8 },
          { name: '스벤 미셸', stat: 5 },
          { name: '필립 클레멘트', stat: 5 },
          { name: '카이 프뢰거', stat: 4 },
          { name: '크리스토퍼 안트비아제이', stat: 3 },
        ]
      },
      'ELV': {
        scorers: [
          { name: '루카 슈넬바커', stat: 15 },
          { name: '케빈 코피', stat: 10 },
          { name: '파울 바너', stat: 6 },
          { name: '야니크 호켈트', stat: 5 },
          { name: '마누엘 파일', stat: 4 },
        ],
        assists: [
          { name: '야니크 호켈트', stat: 8 },
          { name: '마누엘 파일', stat: 6 },
          { name: '루카 슈넬바커', stat: 5 },
          { name: '파울 바너', stat: 4 },
          { name: '탈론 부르고뉴', stat: 3 },
        ]
      },
      'SVW': {
        scorers: [
          { name: '클라우디오 피사로', stat: 109 },
          { name: '마르코 보데', stat: 101 },
          { name: '아일톤', stat: 88 },
          { name: '프랑크 노이바르트', stat: 71 },
          { name: '니클라스 퓔크루크', stat: 45 },
        ],
        assists: [
          { name: '요한 미쿠', stat: 45 },
          { name: '디에고', stat: 40 },
          { name: '메수트 외질', stat: 33 },
          { name: '토르스텐 프링스', stat: 30 },
          { name: '마르코 마린', stat: 25 },
        ]
      },
      'TSG': {
        scorers: [
          { name: '안드레이 크라마리치', stat: 110 },
          { name: '베다드 이비셰비치', stat: 43 },
          { name: '로베르토 피르미누', stat: 38 },
          { name: '세야드 살리호비치', stat: 46 },
          { name: '케빈 폴란트', stat: 33 },
        ],
        assists: [
          { name: '세야드 살리호비치', stat: 40 },
          { name: '로베르토 피르미누', stat: 35 },
          { name: '안드레이 크라마리치', stat: 35 },
          { name: '파벨 카데라베크', stat: 25 },
          { name: '데니스 가이거', stat: 15 },
        ]
      },
      'VFB': {
        scorers: [
          { name: '카를 알괴버', stat: 129 },
          { name: '마리오 고메스', stat: 78 },
          { name: '카카우', stat: 80 },
          { name: '위르겐 클린스만', stat: 79 },
          { name: '크라시미르 발라코프', stat: 54 },
        ],
        assists: [
          { name: '크라시미르 발라코프', stat: 60 },
          { name: '보르나 소사', stat: 30 },
          { name: '크리스티안 겐트너', stat: 25 },
          { name: '카카우', stat: 20 },
          { name: '곤살로 카스트로', stat: 15 },
        ]
      },
      'AUX': {
        scorers: [
          { name: '안제이 샤르마흐', stat: 100 },
          { name: '지브릴 시세', stat: 90 },
          { name: '기 루', stat: 75 },
          { name: '올리비에 카포', stat: 45 },
          { name: '코랑탱 마르탱', stat: 38 },
        ],
        assists: [
          { name: '올리비에 카포', stat: 30 },
          { name: '코랑탱 마르탱', stat: 25 },
          { name: '야니스 타페르', stat: 15 },
          { name: '스테판 기바르쉬', stat: 12 },
          { name: '칼레르베리', stat: 10 },
        ]
      },
      'ANG': {
        scorers: [
          { name: '스테판 물랭', stat: 45 },
          { name: '칼 토코 에캄비', stat: 25 },
          { name: '스테판 바호켄', stat: 24 },
          { name: '소피안 부팔', stat: 20 },
          { name: '안젤로 풀지니', stat: 18 },
        ],
        assists: [
          { name: '토마 망가니', stat: 28 },
          { name: '안젤로 풀지니', stat: 20 },
          { name: '소피안 부팔', stat: 15 },
          { name: '뱅상 망소', stat: 12 },
          { name: '지미 카보', stat: 10 },
        ]
      },
      'ASM': {
        scorers: [
          { name: '델리오 온니스', stat: 223 },
          { name: '라다멜 팔카오', stat: 83 },
          { name: '위삼 벤 예데르', stat: 118 },
          { name: '빅토르 이크페바', stat: 77 },
          { name: '루도빅 지울리', stat: 66 },
        ],
        assists: [
          { name: '알렉산드르 골로빈', stat: 35 },
          { name: '주앙 무티뉴', stat: 31 },
          { name: '제롬 로탕', stat: 28 },
          { name: '나빌 디라르', stat: 25 },
          { name: '베르나르두 실바', stat: 22 },
        ]
      },
      'TRO': {
        scorers: [
          { name: '뱅자맹 니베', stat: 71 },
          { name: '마마두 니앙', stat: 25 },
          { name: '요안 투즈가르', stat: 24 },
          { name: '코랑탱 장', stat: 15 },
          { name: '사비에르 티아구', stat: 12 },
        ],
        assists: [
          { name: '뱅자맹 니베', stat: 35 },
          { name: '스테판 다르비옹', stat: 20 },
          { name: '트리스탄 딩고메', stat: 15 },
          { name: '플로리앙 타르디외', stat: 12 },
          { name: '브라이언 펠레', stat: 10 },
        ]
      },
      'LOR': {
        scorers: [
          { name: '케빈 가메이로', stat: 56 },
          { name: '테렘 모피', stat: 35 },
          { name: '뱅상 아부바카르', stat: 16 },
          { name: '마라망 투레', stat: 15 },
          { name: '피에르알랭 프라우', stat: 14 },
        ],
        assists: [
          { name: '아르망 로리앙테', stat: 20 },
          { name: '얀 주프르', stat: 18 },
          { name: '실뱅 마르보', stat: 15 },
          { name: '엔조 르 페', stat: 14 },
          { name: '막심 바르텔름', stat: 12 },
        ]
      },
      'HAC': {
        scorers: [
          { name: '장미셸 르사주', stat: 68 },
          { name: '기욤 오아로', stat: 28 },
          { name: '티노 카데웨어', stat: 20 },
          { name: '아마두 알라산', stat: 18 },
          { name: '라이언 멘데스', stat: 15 },
        ],
        assists: [
          { name: '알리우 아마두', stat: 15 },
          { name: '나빌 알리우이', stat: 12 },
          { name: '지네딘 페르하트', stat: 10 },
          { name: '장미셸 르사주', stat: 10 },
          { name: '알렉상드르 보네', stat: 8 },
        ]
      },
      'LEM': {
        scorers: [
          { name: '툴리우 지 멜루', stat: 22 },
          { name: '제르비뉴', stat: 15 },
          { name: '모디보 마이가', stat: 15 },
          { name: '앙토니 르 타렉', stat: 14 },
          { name: '스테판 세세뇽', stat: 10 },
        ],
        assists: [
          { name: '제르비뉴', stat: 12 },
          { name: '스테판 세세뇽', stat: 10 },
          { name: '마티외 쿠타되르', stat: 8 },
          { name: '로마릭', stat: 7 },
          { name: '코르샤', stat: 5 },
        ]
      },
      'LIL': {
        scorers: [
          { name: '장 바라트', stat: 218 },
          { name: '조너선 데이비드', stat: 84 },
          { name: '피에르 모루아', stat: 65 },
          { name: '에덴 아자르', stat: 50 },
          { name: '니콜라 페페', stat: 35 },
        ],
        assists: [
          { name: '에덴 아자르', stat: 53 },
          { name: '조나탕 밤바', stat: 30 },
          { name: '프로랑 발몽', stat: 25 },
          { name: '야즈즈', stat: 20 },
          { name: '루도빅 오브라니악', stat: 18 },
        ]
      },
      'NIC': {
        scorers: [
          { name: '샤를리 루베', stat: 77 },
          { name: '아민 구이리', stat: 28 },
          { name: '마리오 발로텔리', stat: 33 },
          { name: '알라산 플레아', stat: 36 },
          { name: '카스페르 돌베르', stat: 24 },
        ],
        assists: [
          { name: '장 미카엘 세리', stat: 22 },
          { name: '아민 구이리', stat: 18 },
          { name: '알랑 생막시맹', stat: 15 },
          { name: '피에르 르스멜루', stat: 12 },
          { name: '발랑탱 에이세릭', stat: 10 },
        ]
      },
      'MAR': {
        scorers: [
          { name: '군나르 안데르손', stat: 194 },
          { name: '장피에르 파팽', stat: 175 },
          { name: '요시프 스코블라르', stat: 151 },
          { name: '마마두 니앙', stat: 100 },
          { name: '앙드레피에르 지냑', stat: 77 },
        ],
        assists: [
          { name: '디미트리 파예트', stat: 95 },
          { name: '플로리앙 토뱅', stat: 50 },
          { name: '마티외 발부에나', stat: 45 },
          { name: '모르강 상송', stat: 25 },
          { name: '루초 곤살레스', stat: 20 },
        ]
      },
      'LYO': {
        scorers: [
          { name: '플뢰리 디 나요', stat: 222 },
          { name: '알렉상드르 라카제트', stat: 175 },
          { name: '베르나르 라콩브', stat: 149 },
          { name: '세르주 키에사', stat: 134 },
          { name: '주니뉴 페르남부카누', stat: 100 },
        ],
        assists: [
          { name: '주니뉴 페르남부카누', stat: 75 },
          { name: '멤피스 데파이', stat: 45 },
          { name: '나빌 페키르', stat: 35 },
          { name: '시드니 고부', stat: 30 },
          { name: '막심 고날롱', stat: 25 },
        ]
      },
      'PFC': {
        scorers: [
          { name: '모르강 기야보귀', stat: 25 },
          { name: '가에탕 로라', stat: 20 },
          { name: '오마르 디아키테', stat: 15 },
          { name: '무스타파 남', stat: 12 },
          { name: '라민 디아비파디가', stat: 10 },
        ],
        assists: [
          { name: '쥘리앵 로페스', stat: 15 },
          { name: '모르강 기야보귀', stat: 12 },
          { name: '가에탕 로라', stat: 10 },
          { name: '시릴 망두키', stat: 8 },
          { name: '플로리앙 마르탱', stat: 6 },
        ]
      },
      'PSG': {
        scorers: [
          { name: '킬리안 음바페', stat: 256 },
          { name: '에딘손 카바니', stat: 200 },
          { name: '즐라탄 이브라히모비치', stat: 156 },
          { name: '네이마르', stat: 118 },
          { name: '파울레타', stat: 109 },
        ],
        assists: [
          { name: '앙헬 디 마리아', stat: 112 },
          { name: '킬리안 음바페', stat: 96 },
          { name: '네이마르', stat: 70 },
          { name: '마르코 베라티', stat: 60 },
          { name: '리오넬 메시', stat: 35 },
        ]
      },
      'RCL': {
        scorers: [
          { name: '마리안 비스니에스키', stat: 93 },
          { name: '로이스 오펜다', stat: 21 },
          { name: '세코 포파나', stat: 21 },
          { name: '플로리앙 소토카', stat: 20 },
          { name: '이그나티우스 가나고', stat: 15 },
        ],
        assists: [
          { name: '조나탕 클로스', stat: 18 },
          { name: '플로리앙 소토카', stat: 15 },
          { name: '토니 마우리시오', stat: 12 },
          { name: '세코 포파나', stat: 10 },
          { name: '가엘 카쿠타', stat: 10 },
        ]
      },
      'STR': {
        scorers: [
          { name: '오스카르 로어', stat: 118 },
          { name: '루도빅 아조르크', stat: 46 },
          { name: '하비브 디알로', stat: 41 },
          { name: '케빈 가메이로', stat: 25 },
          { name: '마마두 니앙', stat: 21 },
        ],
        assists: [
          { name: '디미트리 리에나르', stat: 25 },
          { name: '아드리앵 토마손', stat: 20 },
          { name: '장리크네르 벨가르드', stat: 15 },
          { name: '안토니 카치', stat: 12 },
          { name: '루도빅 아조르크', stat: 10 },
        ]
      },
      'BRE': {
        scorers: [
          { name: '브루노 그루지', stat: 31 },
          { name: '스티브 무니에', stat: 25 },
          { name: '프랑크 오노라', stat: 25 },
          { name: '로맹 델 카스티요', stat: 20 },
          { name: '놀란 루', stat: 15 },
        ],
        assists: [
          { name: '로맹 델 카스티요', stat: 20 },
          { name: '프랑크 오노라', stat: 15 },
          { name: '마티아스 오트레', stat: 12 },
          { name: '요안 쿠르', stat: 10 },
          { name: '브루노 그루지', stat: 10 },
        ]
      },
      'REN': {
        scorers: [
          { name: '장 그뤼멜롱', stat: 154 },
          { name: '뱅자맹 부리조', stat: 50 },
          { name: '마르탱 테리에', stat: 45 },
          { name: '아민 구이리', stat: 25 },
          { name: '음바예 니앙', stat: 21 },
        ],
        assists: [
          { name: '뱅자맹 부리조', stat: 50 },
          { name: '로맹 델 카스티요', stat: 20 },
          { name: '아마리 트라오레', stat: 20 },
          { name: '카를로스 에두아르두', stat: 15 },
          { name: '제레미 도쿠', stat: 12 },
        ]
      },
      'TOU': {
        scorers: [
          { name: '위삼 벤 예데르', stat: 71 },
          { name: '앙드레피에르 지냑', stat: 42 },
          { name: '막스 알랭 그라델', stat: 28 },
          { name: '브랑코 판덴보먼', stat: 22 },
          { name: '티스 달링가', stat: 20 },
        ],
        assists: [
          { name: '브랑코 판덴보먼', stat: 40 },
          { name: '에티엔 디도', stat: 20 },
          { name: '막스 알랭 그라델', stat: 15 },
          { name: '오스카르 트레호', stat: 12 },
          { name: '파레스 샤이비', stat: 10 },
        ]
      },
    };

    const leaguesInfo = [
      { code: 'PL', fdId: 'PL', apiFId: 39, name: 'Premier League' },
      { code: 'PD', fdId: 'PD', apiFId: 140, name: 'La Liga' },
      { code: 'SA', fdId: 'SA', apiFId: 135, name: 'Serie A' },
      { code: 'BL1', fdId: 'BL1', apiFId: 78, name: 'Bundesliga' },
      { code: 'FL1', fdId: 'FL1', apiFId: 61, name: 'Ligue 1' },
    ];

    for (const league of leaguesInfo) {
      try {
        this.logger.log(`${league.code} 리그 데이터 호출 중...`);
        
        const fdResponse = await axios.get(`https://api.football-data.org/v4/competitions/${league.fdId}/teams`, {
          headers: { 'X-Auth-Token': fdApiKey },
        });
        const apiFResponse = await axios.get(`https://v3.football.api-sports.io/teams`, {
          params: { league: league.apiFId, season: 2024 },
          headers: { 'x-apisports-key': apiFApiKey },
        });

        const comp = fdResponse.data.competition;
        const apiFTeams = apiFResponse.data.response;

        await this.leaguesRepository.save({
          id: league.code,
          name: comp.name,
          emblem: comp.emblem,
        });

        const teamsData = fdResponse.data.teams.map((fdTeam: any) => {
          const matchedApiFTeam = apiFTeams.find((fTeam: any) => 
            (fTeam.team.code && fdTeam.tla && fTeam.team.code === fdTeam.tla) || 
            fdTeam.name.toLowerCase().includes(fTeam.team.name.toLowerCase()) ||
            fTeam.team.name.toLowerCase().includes(fdTeam.name.toLowerCase())
          );

          const teamId = fdTeam.tla || fdTeam.shortName?.substring(0, 3).toUpperCase() || 'UNK';
          
          return {
            id: teamId,
            leagueId: league.code,
            name: fdTeam.name,
            logo: fdTeam.crest, 
            founded: fdTeam.founded || 0,
            stadium: fdTeam.venue || matchedApiFTeam?.venue?.name || 'Unknown',
            stadiumImage: matchedApiFTeam?.venue?.image || '', 
            manager: fdTeam.coach?.name || 'Unknown',
            description: `${fdTeam.name}은(는) ${comp.name}의 프로 축구 구단입니다. 홈 구장은 ${fdTeam.venue || 'Unknown'}입니다.`,
            // ✅ 위에서 작성한 manualStats 사전에서 해당 팀의 데이터를 찾아 병합! 없으면 빈 배열 []
            topScorers: manualStats[teamId]?.scorers || [],
            topAssists: manualStats[teamId]?.assists || [],
          };
        });

        await this.teamsRepository.save(teamsData);
        this.logger.log(`${league.code} 리그 팀 저장 및 수동 데이터 병합 완료!`);
        
      } catch (error: any) {
         this.logger.error(`${league.code} API 호출 실패:`, error.message);
      } finally {
        await new Promise(resolve => setTimeout(resolve, 8000));
      }
    }
  }

  async findAllLeagues(): Promise<League[]> {
    return this.leaguesRepository.find();
  }

  async findByLeague(leagueId: string): Promise<Team[]> {
    return this.teamsRepository.find({
      where: { leagueId },
      order: { name: 'ASC' },
    });
  }
}