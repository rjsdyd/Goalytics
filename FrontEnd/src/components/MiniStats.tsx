import { useState } from 'react';

// 💡 각 리그 및 통합(Overall) 역대 Top 20 수동 데이터 (선수명 한글화 완료)
const STATS_DATA = {
  ALL: {
    name: 'All Leagues',
    scorers: [
      { rank: 1, name: '리오넬 메시', stat: 496 },
      { rank: 2, name: '크리스티아누 호날두', stat: 495 },
      { rank: 3, name: '지미 그리브스', stat: 366 },
      { rank: 4, name: '게르트 뮐러', stat: 365 },
      { rank: 5, name: '로베르트 레반도프스키', stat: 362 },
      { rank: 6, name: '실비오 피올라', stat: 274 },
      { rank: 7, name: '카림 벤제마', stat: 281 },
      { rank: 8, name: '앨런 시어러', stat: 283 },
      { rank: 9, name: '에딘손 카바니', stat: 267 },
      { rank: 10, name: '프란체스코 토티', stat: 250 },
      { rank: 11, name: '즐라탄 이브라히모비치', stat: 302 },
      { rank: 12, name: '델리오 온니스', stat: 299 },
      { rank: 13, name: '티에리 앙리', stat: 233 },
      { rank: 14, name: '킬리안 음바페', stat: 200 },
      { rank: 15, name: '해리 케인', stat: 250 },
      { rank: 16, name: '세르히오 아구에로', stat: 184 },
      { rank: 17, name: '루이스 수아레스', stat: 176 },
      { rank: 18, name: '곤살로 이과인', stat: 237 },
      { rank: 19, name: '웨인 루니', stat: 208 },
      { rank: 20, name: '피에르에메릭 오바메양', stat: 200 },
    ],
    assists: [
      { rank: 1, name: '리오넬 메시', stat: 250 },
      { rank: 2, name: '토마스 뮐러', stat: 200 },
      { rank: 3, name: '라이언 긱스', stat: 162 },
      { rank: 4, name: '케빈 더 브라위너', stat: 160 },
      { rank: 5, name: '세스크 파브레가스', stat: 150 },
      { rank: 6, name: '앙헬 디 마리아', stat: 145 },
      { rank: 7, name: '메수트 외질', stat: 132 },
      { rank: 8, name: '디미트리 파예트', stat: 115 },
      { rank: 9, name: '사비 에르난데스', stat: 112 },
      { rank: 10, name: '안드레스 이니에스타', stat: 110 },
      { rank: 11, name: '카림 벤제마', stat: 109 },
      { rank: 12, name: '네이마르', stat: 105 },
      { rank: 13, name: '웨인 루니', stat: 103 },
      { rank: 14, name: '프랭크 램파드', stat: 102 },
      { rank: 15, name: '루이스 수아레스', stat: 100 },
      { rank: 16, name: '프랑크 리베리', stat: 98 },
      { rank: 17, name: '크리스티아누 호날두', stat: 95 },
      { rank: 18, name: '다비드 실바', stat: 93 },
      { rank: 19, name: '스티븐 제라드', stat: 92 },
      { rank: 20, name: '마르코 로이스', stat: 90 },
    ]
  },
  PL: {
    name: 'Premier League',
    scorers: [
      { rank: 1, name: '앨런 시어러', stat: 260 }, { rank: 2, name: '해리 케인', stat: 213 },
      { rank: 3, name: '웨인 루니', stat: 208 }, { rank: 4, name: '앤디 콜', stat: 187 },
      { rank: 5, name: '세르히오 아구에로', stat: 184 }, { rank: 6, name: '프랭크 램파드', stat: 177 },
      { rank: 7, name: '티에리 앙리', stat: 175 }, { rank: 8, name: '로비 파울러', stat: 163 },
      { rank: 9, name: '저메인 데포', stat: 162 }, { rank: 10, name: '모하메드 살라', stat: 157 },
      { rank: 11, name: '마이클 오언', stat: 150 }, { rank: 12, name: '레스 퍼디낸드', stat: 149 },
      { rank: 13, name: '테디 셰링엄', stat: 146 }, { rank: 14, name: '로빈 반 페르시', stat: 144 },
      { rank: 15, name: '제이미 바디', stat: 136 }, { rank: 16, name: '지미 하셀바잉크', stat: 127 },
      { rank: 17, name: '로비 킨', stat: 126 }, { rank: 18, name: '니콜라 아넬카', stat: 125 },
      { rank: 19, name: '라힘 스털링', stat: 123 }, { rank: 20, name: '드와이트 요크', stat: 123 },
    ],
    assists: [
      { rank: 1, name: '라이언 긱스', stat: 162 }, { rank: 2, name: '케빈 더 브라위너', stat: 112 },
      { rank: 3, name: '세스크 파브레가스', stat: 111 }, { rank: 4, name: '웨인 루니', stat: 103 },
      { rank: 5, name: '프랭크 램파드', stat: 102 }, { rank: 6, name: '데니스 베르캄프', stat: 94 },
      { rank: 7, name: '다비드 실바', stat: 93 }, { rank: 8, name: '스티븐 제라드', stat: 92 },
      { rank: 9, name: '제임스 밀너', stat: 89 }, { rank: 10, name: '데이비드 베컴', stat: 80 },
      { rank: 11, name: '테디 셰링엄', stat: 76 }, { rank: 12, name: '크리스티안 에릭센', stat: 75 },
      { rank: 13, name: '티에리 앙리', stat: 74 }, { rank: 14, name: '앤디 콜', stat: 73 },
      { rank: 15, name: '애슐리 영', stat: 71 }, { rank: 16, name: '모하메드 살라', stat: 69 },
      { rank: 17, name: '대런 앤더튼', stat: 68 }, { rank: 18, name: '가레스 배리', stat: 64 },
      { rank: 19, name: '매튜 르 티시에', stat: 63 }, { rank: 20, name: '손흥민', stat: 62 },
    ]
  },
  LIGA: {
    name: 'La Liga',
    scorers: [
      { rank: 1, name: '리오넬 메시', stat: 474 }, { rank: 2, name: '크리스티아누 호날두', stat: 311 },
      { rank: 3, name: '텔모 사라', stat: 251 }, { rank: 4, name: '카림 벤제마', stat: 238 },
      { rank: 5, name: '우고 산체스', stat: 234 }, { rank: 6, name: '라울 곤살레스', stat: 228 },
      { rank: 7, name: '알프레도 디 스테파노', stat: 227 }, { rank: 8, name: '세사르 로드리게스', stat: 221 },
      { rank: 9, name: '키니', stat: 219 }, { rank: 10, name: '파이뇨', stat: 212 },
      { rank: 11, name: '문도', stat: 195 }, { rank: 12, name: '앙투안 그리즈만', stat: 190 },
      { rank: 13, name: '산티야나', stat: 186 }, { rank: 14, name: '다비드 비야', stat: 185 },
      { rank: 15, name: '기예르모 고로스티사', stat: 178 }, { rank: 16, name: '루이스 수아레스', stat: 176 },
      { rank: 17, name: '사무엘 에투', stat: 162 }, { rank: 18, name: '페렌츠 푸스카스', stat: 156 },
      { rank: 19, name: '훌리오 살리나스', stat: 152 }, { rank: 20, name: '아드리안 에스쿠데로', stat: 150 },
    ],
    assists: [
      { rank: 1, name: '리오넬 메시', stat: 192 }, { rank: 2, name: '사비 에르난데스', stat: 112 },
      { rank: 3, name: '카림 벤제마', stat: 109 }, { rank: 4, name: '안드레스 이니에스타', stat: 93 },
      { rank: 5, name: '크리스티아누 호날두', stat: 87 }, { rank: 6, name: '코케', stat: 85 },
      { rank: 7, name: '다니 알베스', stat: 83 }, { rank: 8, name: '헤수스 나바스', stat: 80 },
      { rank: 9, name: '이반 라키티치', stat: 75 }, { rank: 10, name: '앙투안 그리즈만', stat: 74 },
      { rank: 11, name: '루이스 수아레스', stat: 73 }, { rank: 12, name: '마르셀루', stat: 70 },
      { rank: 13, name: '토니 크로스', stat: 68 }, { rank: 14, name: '다니 파레호', stat: 65 },
      { rank: 15, name: '조르디 알바', stat: 62 }, { rank: 16, name: '루이스 피구', stat: 60 },
      { rank: 17, name: '구티', stat: 58 }, { rank: 18, name: '호아킨', stat: 55 },
      { rank: 19, name: '호베르투 카를로스', stat: 53 }, { rank: 20, name: '미켈 오야르사발', stat: 50 },
    ]
  },
  SERIE_A: {
    name: 'Serie A',
    scorers: [
      { rank: 1, name: '실비오 피올라', stat: 274 }, { rank: 2, name: '프란체스코 토티', stat: 250 },
      { rank: 3, name: '군나르 노르달', stat: 225 }, { rank: 4, name: '주세페 메아차', stat: 216 },
      { rank: 5, name: '조제 알타피니', stat: 216 }, { rank: 6, name: '안토니오 디 나탈레', stat: 209 },
      { rank: 7, name: '로베르토 바조', stat: 205 }, { rank: 8, name: '치로 임모빌레', stat: 201 },
      { rank: 9, name: '쿠르트 함린', stat: 190 }, { rank: 10, name: '주세페 시뇨리', stat: 188 },
      { rank: 11, name: '알레산드로 델 피에로', stat: 188 }, { rank: 12, name: '알베르토 질라르디노', stat: 188 },
      { rank: 13, name: '가브리엘 바티스투타', stat: 184 }, { rank: 14, name: '파비오 콸리아렐라', stat: 182 },
      { rank: 15, name: '잠피에로 보니페르티', stat: 178 }, { rank: 16, name: '아메데오 아마데이', stat: 174 },
      { rank: 17, name: '주세페 사볼디', stat: 168 }, { rank: 18, name: '굴리엘모 가베토', stat: 167 },
      { rank: 19, name: '로베르토 보닌세냐', stat: 163 }, { rank: 20, name: '루카 토니', stat: 157 },
    ],
    assists: [
      { rank: 1, name: '프란체스코 토티', stat: 152 }, { rank: 2, name: '로베르토 바조', stat: 119 },
      { rank: 3, name: '알레산드로 델 피에로', stat: 105 }, { rank: 4, name: '마렉 함식', stat: 85 },
      { rank: 5, name: '안토니오 칸드레바', stat: 82 }, { rank: 6, name: '안토니오 카사노', stat: 80 },
      { rank: 7, name: '미랄렘 퍄니치', stat: 75 }, { rank: 8, name: '로렌초 인시녜', stat: 74 },
      { rank: 9, name: '도메니코 베라르디', stat: 73 }, { rank: 10, name: '파푸 고메스', stat: 71 },
      { rank: 11, name: '안드레아 피를로', stat: 70 }, { rank: 12, name: '후안 콰드라도', stat: 68 },
      { rank: 13, name: 'S. 밀린코비치사비치', stat: 65 }, { rank: 14, name: '하칸 찰하놀루', stat: 62 },
      { rank: 15, name: '드리스 메르텐스', stat: 60 }, { rank: 16, name: '파울로 디발라', stat: 58 },
      { rank: 17, name: '후이 코스타', stat: 55 }, { rank: 18, name: '안토니오 디 나탈레', stat: 54 },
      { rank: 19, name: '루이스 알베르토', stat: 52 }, { rank: 20, name: '니콜로 바렐라', stat: 50 },
    ]
  },
  BUNDESLIGA: {
    name: 'Bundesliga',
    scorers: [
      { rank: 1, name: '게르트 뮐러', stat: 365 }, { rank: 2, name: '로베르트 레반도프스키', stat: 312 },
      { rank: 3, name: '클라우스 피셔', stat: 268 }, { rank: 4, name: '유프 하인케스', stat: 220 },
      { rank: 5, name: '만프레트 부르크스뮐러', stat: 213 }, { rank: 6, name: '클라우디오 피사로', stat: 197 },
      { rank: 7, name: '울프 키르스텐', stat: 181 }, { rank: 8, name: '슈테판 쿤츠', stat: 179 },
      { rank: 9, name: '디터 뮐러', stat: 177 }, { rank: 10, name: '클라우스 알로프스', stat: 177 },
      { rank: 11, name: '마리오 고메스', stat: 170 }, { rank: 12, name: '하네스 뢰어', stat: 166 },
      { rank: 13, name: '카를하인츠 루메니게', stat: 162 }, { rank: 14, name: '베른트 횔첸바인', stat: 160 },
      { rank: 15, name: '프리츠 발터', stat: 157 }, { rank: 16, name: '마르코 로이스', stat: 156 },
      { rank: 17, name: '토마스 뮐러', stat: 150 }, { rank: 18, name: '토마스 알로프스', stat: 148 },
      { rank: 19, name: '슈테판 키슬링', stat: 144 }, { rank: 20, name: '베른트 니켈', stat: 141 },
    ],
    assists: [
      { rank: 1, name: '토마스 뮐러', stat: 170 }, { rank: 2, name: '프랑크 리베리', stat: 103 },
      { rank: 3, name: '마르코 로이스', stat: 93 }, { rank: 4, name: '제 로베르투', stat: 80 },
      { rank: 5, name: '메흐메트 숄', stat: 75 }, { rank: 6, name: '마리오 괴체', stat: 72 },
      { rank: 7, name: '요주아 키미히', stat: 70 }, { rank: 8, name: '필립 코스티치', stat: 68 },
      { rank: 9, name: '제이든 산초', stat: 65 }, { rank: 10, name: '막스 크루제', stat: 62 },
      { rank: 11, name: '빈첸초 그리포', stat: 60 }, { rank: 12, name: '율리안 브란트', stat: 58 },
      { rank: 13, name: '미로슬라프 클로제', stat: 55 }, { rank: 14, name: '요나스 호프만', stat: 52 },
      { rank: 15, name: '에밀 포르스베리', stat: 50 }, { rank: 16, name: '아르옌 로벤', stat: 48 },
      { rank: 17, name: '토마스 헤슬러', stat: 45 }, { rank: 18, name: '안드레아스 묄러', stat: 44 },
      { rank: 19, name: '안디 헤르초크', stat: 42 }, { rank: 20, name: '바스티안 슈바인슈타이거', stat: 40 },
    ]
  },
  LIGUE_1: {
    name: 'Ligue 1',
    scorers: [
      { rank: 1, name: '델리오 온니스', stat: 299 }, { rank: 2, name: '베르나르 라콩브', stat: 255 },
      { rank: 3, name: '에르베 레벨리', stat: 216 }, { rank: 4, name: '로제 쿠르투아', stat: 210 },
      { rank: 5, name: '타데 치소프스키', stat: 206 }, { rank: 6, name: '로제 피앙토니', stat: 203 },
      { rank: 7, name: '킬리안 음바페', stat: 191 }, { rank: 8, name: '조셉 우이라키', stat: 190 },
      { rank: 9, name: '플뢰리 디 나요', stat: 187 }, { rank: 10, name: '요시프 스코블라르', stat: 179 },
      { rank: 11, name: '군나르 안데르손', stat: 179 }, { rank: 12, name: '하산 아케스비', stat: 173 },
      { rank: 13, name: '장 바라트', stat: 169 }, { rank: 14, name: '쥐스트 퐁텐', stat: 164 },
      { rank: 15, name: '알랭 지레스', stat: 163 }, { rank: 16, name: '위삼 벤 예데르', stat: 161 },
      { rank: 17, name: '앙드레 기', stat: 159 }, { rank: 18, name: '도미니크 로슈토', stat: 145 },
      { rank: 19, name: '파울레타', stat: 141 }, { rank: 20, name: '에딘손 카바니', stat: 138 },
    ],
    assists: [
      { rank: 1, name: '디미트리 파예트', stat: 115 }, { rank: 2, name: '앙헬 디 마리아', stat: 72 },
      { rank: 3, name: '킬리안 음바페', stat: 65 }, { rank: 4, name: '주니뉴 페르남부카누', stat: 58 },
      { rank: 5, name: '제롬 로탕', stat: 55 }, { rank: 6, name: '네이마르', stat: 50 },
      { rank: 7, name: '마르코 베라티', stat: 48 }, { rank: 8, name: '마르빈 마르탱', stat: 45 },
      { rank: 9, name: '뱅자맹 부리조', stat: 42 }, { rank: 10, name: '테지 사바니에', stat: 40 },
      { rank: 11, name: '쥘리앵 페레', stat: 38 }, { rank: 12, name: '루초 곤살레스', stat: 35 },
      { rank: 13, name: '루도빅 지울리', stat: 33 }, { rank: 14, name: '조나탕 밤바', stat: 32 },
      { rank: 15, name: '리아드 부데부즈', stat: 30 }, { rank: 16, name: '요안 구르퀴프', stat: 29 },
      { rank: 17, name: '멤피스 데파이', stat: 28 }, { rank: 18, name: '플로랑 말루다', stat: 27 },
      { rank: 19, name: '네네', stat: 26 }, { rank: 20, name: '아템 벤 아르파', stat: 25 },
    ]
  },
};

const LEAGUE_KEYS = ['ALL', 'PL', 'LIGA', 'SERIE_A', 'BUNDESLIGA', 'LIGUE_1'] as const;
type LeagueKey = typeof LEAGUE_KEYS[number];

export default function TopStatsWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [activeLeague, setActiveLeague] = useState<LeagueKey>('ALL');
  const [activeTab, setActiveTab] = useState<'scorers' | 'assists'>('scorers');

  const topOverallScorer = STATS_DATA.ALL.scorers[0];
  const currentData = STATS_DATA[activeLeague][activeTab];

  return (
    <>
      {/* 💡 Flex 레이아웃 구조를 활용하여 요소를 상-중-하로 완벽히 분배 */}
      <div className="bg-[#41e307] rounded-[32px] p-6 text-[#141b26] flex flex-col h-full min-h-[260px] shadow-sm">
        
        {/* 1. 상단 헤더 */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">Overall Top Scorer</h3>
        </div>

        {/* 2. 중앙 정렬된 데이터 영역 (flex-1과 justify-center를 통해 수직 중앙에 배치) */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <h2 className="text-4xl font-black tracking-tight mb-2">{topOverallScorer.name}</h2>
          <p className="font-bold text-[#141b26]/70">5대 리그 통산 {topOverallScorer.stat}골</p>
        </div>

        {/* 3. 하단을 꽉 채우는 풀사이즈 버튼 (History 위젯과 스타일 통일) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 bg-[#141b26]/10 hover:bg-[#141b26]/20 text-[#141b26] rounded-xl font-bold transition mt-auto"
        >
          More
        </button>
      </div>

      {/* --- 모달 영역 (이전과 동일) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            
            <div className="p-6 border-b border-gray-100 pb-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">역대 순위 Top 20</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
                {LEAGUE_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveLeague(key)}
                    className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition ${
                      activeLeague === key 
                        ? 'bg-[#141b26] text-white' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {STATS_DATA[key].name}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('scorers')}
                  className={`flex-1 py-2 rounded-full font-bold text-sm transition ${
                    activeTab === 'scorers' 
                      ? 'bg-[#41e307] text-[#141b26]' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  득점 (Goals)
                </button>
                <button
                  onClick={() => setActiveTab('assists')}
                  className={`flex-1 py-2 rounded-full font-bold text-sm transition ${
                    activeTab === 'assists' 
                      ? 'bg-[#41e307] text-[#141b26]' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  도움 (Assists)
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="bg-white rounded-2xl shadow-sm p-2">
                {currentData.map((player) => (
                  <div key={player.rank} className="flex items-center justify-between py-3 px-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className={`w-6 text-center font-bold ${player.rank <= 3 ? 'text-[#41e307]' : 'text-gray-400'}`}>
                        {player.rank}
                      </span>
                      <span className="font-semibold text-gray-800 truncate max-w-[250px]">{player.name}</span>
                    </div>
                    <span className="font-black text-gray-900">{player.stat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}