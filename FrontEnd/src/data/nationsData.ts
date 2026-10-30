// src/data/nationsData.ts

export interface Confederation {
  id: string;
  name: string;
  logo: string;
}

export interface PlayerStat {
  rank: number;
  name: string;
  stat: number;
}

export interface NationalTeam {
  id: string; // flagcdn에 사용될 국가 코드 (예: kr, ar, gb-eng)
  name: string;
  confederation: string;
  manager: string;
  captain: string;
  description: string;
  topScorers: PlayerStat[];
  topAssists: PlayerStat[];
  honors: string[];
}

// 💡 각 대륙별 축구연맹 로고 (위키미디어 공용 SVG 활용)
export const CONFEDERATIONS: Confederation[] = [
  { id: 'UEFA', name: '유럽 (UEFA)', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/UEFA_logo.svg' },
  { id: 'CONMEBOL', name: '남미 (CONMEBOL)', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Logo_Conmebol.svg' },
  { id: 'AFC', name: '아시아 (AFC)', logo: 'https://upload.wikimedia.org/wikipedia/en/2/25/Asian_Football_Confederation_logo.svg' },
  { id: 'CAF', name: '아프리카 (CAF)', logo: 'https://upload.wikimedia.org/wikipedia/en/4/46/Confederation_of_African_Football_logo.svg' },
  { id: 'CONCACAF', name: '북중미 (CONCACAF)', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/CONCACAF_logo.svg' },
];

export const NATIONAL_TEAMS: NationalTeam[] = [
// ================= [ AFC (아시아) - 30개국 (데이터 최신화 및 Top 3 꽉 채움) ] =================
  {
    id: 'kr', name: '대한민국', confederation: 'AFC', manager: '모레노', captain: '손흥민', description: '아시아 축구의 호랑이. 최근 모레노 감독 체제 하에 손흥민이 역대 A매치 최다 득점자에 등극했습니다.',
    topScorers: [{ rank: 1, name: '손흥민', stat: 60 }, { rank: 2, name: '차범근', stat: 58 }, { rank: 3, name: '황선홍', stat: 50 }],
    topAssists: [{ rank: 1, name: '손흥민', stat: 22 }, { rank: 2, name: '이영표', stat: 19 }, { rank: 3, name: '기성용', stat: 15 }], honors: ['AFC 아시안컵 우승 2회', '아시안게임 금메달 6회']
  },
  {
    id: 'jp', name: '일본', confederation: 'AFC', manager: '모리야스 하지메', captain: '엔도 와타루', description: '사무라이 블루. 정교한 패스 플레이와 탄탄한 유럽파 뎁스를 자랑합니다.',
    topScorers: [{ rank: 1, name: '카마모토 쿠니시게', stat: 75 }, { rank: 2, name: '미우라 카즈요시', stat: 55 }, { rank: 3, name: '오카자키 신지', stat: 50 }],
    topAssists: [{ rank: 1, name: '혼다 케이스케', stat: 23 }, { rank: 2, name: '카가와 신지', stat: 19 }, { rank: 3, name: '나카무라 슌스케', stat: 15 }], honors: ['AFC 아시안컵 우승 4회']
  },
  {
    id: 'ir', name: '이란', confederation: 'AFC', manager: '아미르 갈레노에이', captain: '알리레자 자한바크슈', description: '팀 멜리. 압도적인 피지컬과 끈적한 수비력을 갖춘 중동의 전통 강호입니다.',
    topScorers: [{ rank: 1, name: '알리 다에이', stat: 109 }, { rank: 2, name: '사르다르 아즈문', stat: 55 }, { rank: 3, name: '카림 바게리', stat: 50 }],
    topAssists: [{ rank: 1, name: '알리 카리미', stat: 22 }, { rank: 2, name: '메흐디 타레미', stat: 18 }, { rank: 3, name: '메흐디 마다비키아', stat: 15 }], honors: ['AFC 아시안컵 우승 3회']
  },
  {
    id: 'au', name: '호주', confederation: 'AFC', manager: '토니 포포비치', captain: '매튜 라이언', description: '사커루. 강력한 체격 조건을 바탕으로 아시아 무대를 호령하는 오세아니아의 호주입니다.',
    topScorers: [{ rank: 1, name: '팀 케이힐', stat: 50 }, { rank: 2, name: '데미안 모리', stat: 29 }, { rank: 3, name: '아치 톰슨', stat: 28 }],
    topAssists: [{ rank: 1, name: '해리 큐얼', stat: 15 }, { rank: 2, name: '매튜 레키', stat: 12 }, { rank: 3, name: '마일 제디낙', stat: 10 }], honors: ['AFC 아시안컵 우승 1회', 'OFC 네이션스컵 우승 4회']
  },
  {
    id: 'sa', name: '사우디아라비아', confederation: 'AFC', manager: '에르베 르나르', captain: '살렘 알 다우사리', description: '녹색 매. 막대한 투자를 바탕으로 자국 리그 선수들끼리 탄탄한 조직력을 구축했습니다.',
    topScorers: [{ rank: 1, name: '마제드 압둘라', stat: 72 }, { rank: 2, name: '사미 알 자베르', stat: 46 }, { rank: 3, name: '야세르 알 카타니', stat: 42 }],
    topAssists: [{ rank: 1, name: '사미 알 자베르', stat: 18 }, { rank: 2, name: '타이시르 알 자심', stat: 15 }, { rank: 3, name: '나와프 알 아베드', stat: 12 }], honors: ['AFC 아시안컵 우승 3회']
  },
  {
    id: 'qa', name: '카타르', confederation: 'AFC', manager: '틴틴 마르케스', captain: '아크람 아피프', description: '아시안컵 2연패에 빛나는 중동 축구의 새로운 절대 강자입니다.',
    topScorers: [{ rank: 1, name: '알모에즈 알리', stat: 54 }, { rank: 2, name: '만수르 무프타', stat: 42 }, { rank: 3, name: '하산 알하이도스', stat: 40 }],
    topAssists: [{ rank: 1, name: '아크람 아피프', stat: 35 }, { rank: 2, name: '하산 알하이도스', stat: 25 }, { rank: 3, name: '부알렘 쿠키', stat: 15 }], honors: ['AFC 아시안컵 우승 2회']
  },
  {
    id: 'uz', name: '우즈베키스탄', confederation: 'AFC', manager: '스레치코 카타네츠', captain: '엘도르 쇼무로도프', description: '백라의 늑대들. 최근 유스 시스템의 결실을 보며 아시아 최상위권 진입을 노립니다.',
    topScorers: [{ rank: 1, name: '엘도르 쇼무로도프', stat: 41 }, { rank: 2, name: '막심 샤츠키흐', stat: 34 }, { rank: 3, name: '알렉산데르 게인리흐', stat: 31 }],
    topAssists: [{ rank: 1, name: '세르베르 제파로프', stat: 21 }, { rank: 2, name: '오딜 아흐메도프', stat: 18 }, { rank: 3, name: '엘도르 쇼무로도프', stat: 15 }], honors: ['아시안게임 금메달 1회']
  },
  {
    id: 'iq', name: '이라크', confederation: 'AFC', manager: '헤수스 카사스', captain: '잘랄 하산', description: '메소포타미아의 사자. 전란 속에서도 2007년 아시안컵 우승의 기적을 쓴 팀입니다.',
    topScorers: [{ rank: 1, name: '후세인 사이드', stat: 78 }, { rank: 2, name: '아흐메드 라디', stat: 62 }, { rank: 3, name: '유니스 마흐무드', stat: 57 }],
    topAssists: [{ rank: 1, name: '유니스 마흐무드', stat: 14 }, { rank: 2, name: '하와르 물라 모하메드', stat: 12 }, { rank: 3, name: '나샤트 아크람', stat: 10 }], honors: ['AFC 아시안컵 우승 1회']
  },
  {
    id: 'ae', name: '아랍에미리트', confederation: 'AFC', manager: '파울루 벤투', captain: '알리 마브쿠트', description: '알 아비야드. 파울루 벤투 감독의 지휘 아래 기술적인 빌드업 축구를 구사합니다.',
    topScorers: [{ rank: 1, name: '알리 마브쿠트', stat: 85 }, { rank: 2, name: '아드난 알 탈리아니', stat: 52 }, { rank: 3, name: '아흐메드 칼릴', stat: 48 }],
    topAssists: [{ rank: 1, name: '오마르 압둘라흐만', stat: 19 }, { rank: 2, name: '이스마일 마타르', stat: 15 }, { rank: 3, name: '알리 마브쿠트', stat: 12 }], honors: ['걸프컵 우승 2회']
  },
  {
    id: 'cn', name: '중국', confederation: 'AFC', manager: '브란코 이반코비치', captain: '우레이', description: '용의 군단. 막대한 인구를 바탕으로 아시아 축구 굴기를 꿈꾸는 팀입니다.',
    topScorers: [{ rank: 1, name: '하오하이둥', stat: 41 }, { rank: 2, name: '우레이', stat: 36 }, { rank: 3, name: '판즈이', stat: 17 }],
    topAssists: [{ rank: 1, name: '가오린', stat: 12 }, { rank: 2, name: '하오하이둥', stat: 10 }, { rank: 3, name: '우레이', stat: 9 }], honors: ['EAFF E-1 챔피언십 우승 2회']
  },
  {
    id: 'jo', name: '요르단', confederation: 'AFC', manager: '자말 셀라미', captain: '이흐산 하디드', description: '2023 아시안컵에서 준우승 돌풍을 일으킨 끈적한 수비와 역습의 팀입니다.',
    topScorers: [{ rank: 1, name: '함자 알 다르두르', stat: 35 }, { rank: 2, name: '핫산 압델 파타', stat: 30 }, { rank: 3, name: '야잔 알 나이마트', stat: 18 }],
    topAssists: [{ rank: 1, name: '무사 알 타마리', stat: 11 }, { rank: 2, name: '아메드 사미르', stat: 9 }, { rank: 3, name: '마흐무드 알 마르디', stat: 8 }], honors: ['아랍 게임 우승 2회']
  },
  {
    id: 'sy', name: '시리아', confederation: 'AFC', manager: '엑토르 쿠페르', captain: '오마르 알 소마', description: '카시온의 독수리들. 어려운 국가 사정 속에서도 탄탄한 조직력을 자랑합니다.',
    topScorers: [{ rank: 1, name: '피라스 알 카티브', stat: 36 }, { rank: 2, name: '오마르 알 소마', stat: 21 }, { rank: 3, name: '마흐무드 알 마와스', stat: 15 }],
    topAssists: [{ rank: 1, name: '마흐무드 알 마와스', stat: 15 }, { rank: 2, name: '오마르 크리빈', stat: 10 }, { rank: 3, name: '파하드 유세프', stat: 8 }], honors: ['서아시아 축구 선수권 우승 1회']
  },
  {
    id: 'bh', name: '바레인', confederation: 'AFC', manager: '드라간 탈라이치', captain: '사예드 모하메드 자페르', description: '딜문 전사. 아시안컵과 중동 예선에서 종종 강팀의 발목을 잡는 복병입니다.',
    topScorers: [{ rank: 1, name: '이스마일 압둘라티프', stat: 47 }, { rank: 2, name: '알라 후바일', stat: 26 }, { rank: 3, name: '모하메드 살민', stat: 16 }],
    topAssists: [{ rank: 1, name: '파우지 아이시', stat: 12 }, { rank: 2, name: '압둘라 오마르', stat: 10 }, { rank: 3, name: '사이드 시디바', stat: 8 }], honors: ['걸프컵 우승 1회']
  },
  {
    id: 'om', name: '오만', confederation: 'AFC', manager: '야로슬라프 실하비', captain: '하리브 알 사디', description: '걸프만의 붉은 전사들. 수비력이 매우 뛰어나며 중동 내셔널 대회의 강자입니다.',
    topScorers: [{ rank: 1, name: '하니 알 다비트', stat: 43 }, { rank: 2, name: '아마드 알 호스니', stat: 38 }, { rank: 3, name: '무흐신 알 가사니', stat: 15 }],
    topAssists: [{ rank: 1, name: '아마드 알 호스니', stat: 14 }, { rank: 2, name: '라에드 이브라힘 살레', stat: 10 }, { rank: 3, name: '무흐신 알 칼디', stat: 8 }], honors: ['걸프컵 우승 2회']
  },
  {
    id: 'th', name: '태국', confederation: 'AFC', manager: '이시이 마사타다', captain: '차나팁 송크라신', description: '전투 코끼리. 동남아시아 축구의 절대 강자로 빠른 템포와 정교한 패스가 특징입니다.',
    topScorers: [{ rank: 1, name: '키아티숙 세나무앙', stat: 71 }, { rank: 2, name: '피야퐁 피에우온', stat: 70 }, { rank: 3, name: '티라실 당다', stat: 64 }],
    topAssists: [{ rank: 1, name: '차나팁 송크라신', stat: 18 }, { rank: 2, name: '티라톤 분마탄', stat: 15 }, { rank: 3, name: '수파촉 사라차트', stat: 10 }], honors: ['AFF 미쓰비시전기컵 우승 7회']
  },
  {
    id: 'vn', name: '베트남', confederation: 'AFC', manager: '김상식', captain: '도흥중', description: '금성홍기. 강력한 압박과 기동력을 바탕으로 동남아시아 맹주 자리를 다툽니다.',
    topScorers: [{ rank: 1, name: '레꽁빈', stat: 51 }, { rank: 2, name: '응우옌 띠엔린', stat: 22 }, { rank: 3, name: '응우옌 꽝하이', stat: 11 }],
    topAssists: [{ rank: 1, name: '응우옌 꽝하이', stat: 12 }, { rank: 2, name: '도흥중', stat: 9 }, { rank: 3, name: '응우옌 반꾸엣', stat: 8 }], honors: ['AFF 미쓰비시전기컵 우승 2회']
  },
  {
    id: 'id', name: '인도네시아', confederation: 'AFC', manager: '신태용', captain: '아스나위 망쿠알람', description: '가루다. 신태용 감독의 지휘 아래 귀화 선수들을 대거 영입하며 돌풍을 일으키고 있습니다.',
    topScorers: [{ rank: 1, name: '압둘 카디르', stat: 70 }, { rank: 2, name: '이와얀 디프타', stat: 50 }, { rank: 3, name: '밤방 파뭉카스', stat: 38 }],
    topAssists: [{ rank: 1, name: '에반 디마스', stat: 10 }, { rank: 2, name: '리키 캄부아야', stat: 8 }, { rank: 3, name: '아스나위 망쿠알람', stat: 6 }], honors: ['동남아시아 경기 대회 금메달 3회']
  },
  {
    id: 'my', name: '말레이시아', confederation: 'AFC', manager: '파우지 로세', captain: '디온 쿨스', description: '말라야 호랑이. 스피드를 활용한 역습 축구를 구사하며 꾸준한 발전을 보입니다.',
    topScorers: [{ rank: 1, name: '모크타르 다하리', stat: 89 }, { rank: 2, name: '자이날 아비딘 하산', stat: 50 }, { rank: 3, name: '이사 바카르', stat: 45 }],
    topAssists: [{ rank: 1, name: '사파위 라시드', stat: 11 }, { rank: 2, name: '아키야르 라시드', stat: 8 }, { rank: 3, name: '파이살 할림', stat: 7 }], honors: ['AFF 미쓰비시전기컵 우승 1회']
  },
  {
    id: 'in', name: '인도', confederation: 'AFC', manager: '마놀로 마르케스', captain: '구르프리트 싱 산두', description: '블루 타이거스. 세계 최대 인구를 바탕으로 지속적인 투자를 통해 성장 중입니다.',
    topScorers: [{ rank: 1, name: '수닐 체트리', stat: 94 }, { rank: 2, name: '샹무감 벤카테쉬', stat: 20 }, { rank: 3, name: '바이충 부티아', stat: 19 }],
    topAssists: [{ rank: 1, name: '바이충 부티아', stat: 8 }, { rank: 2, name: '수닐 체트리', stat: 7 }, { rank: 3, name: '제제 랄페클루아', stat: 6 }], honors: ['SAFF 챔피언십 우승 9회']
  },
  {
    id: 'lb', name: '레바논', confederation: 'AFC', manager: '미오드라그 라둘로비치', captain: '하산 마투크', description: '백향목 군단. 해외 교포 출신 선수들을 앞세워 피지컬과 기술을 혼합한 축구를 구사합니다.',
    topScorers: [{ rank: 1, name: '하산 마투크', stat: 23 }, { rank: 2, name: '로다 안타르', stat: 20 }, { rank: 3, name: '모하마드 가다르', stat: 19 }],
    topAssists: [{ rank: 1, name: '모하마드 하이다르', stat: 10 }, { rank: 2, name: '하산 마투크', stat: 9 }, { rank: 3, name: '로다 안타르', stat: 7 }], honors: ['아랍 축구 선수권 3위']
  },
  {
    id: 'ps', name: '팔레스타인', confederation: 'AFC', manager: '마크람 다부브', captain: '무사브 알바타트', description: '사자들. 최근 아시안컵 역사상 최초 16강 진출이라는 쾌거를 이루었습니다.',
    topScorers: [{ rank: 1, name: '아슈라프 누만', stat: 14 }, { rank: 2, name: '파헤드 아탈', stat: 14 }, { rank: 3, name: '오다이 다바그', stat: 13 }],
    topAssists: [{ rank: 1, name: '타메르 세얌', stat: 8 }, { rank: 2, name: '마흐무드 아부 와르다', stat: 6 }, { rank: 3, name: '아슈라프 누만', stat: 5 }], honors: ['AFC 챌린지컵 우승 1회']
  },
  {
    id: 'tj', name: '타지키스탄', confederation: 'AFC', manager: '겔라 셰킬라제', captain: '파르비존 우마르바예프', description: '페르시아의 사자. 2023 아시안컵에서 8강에 진출하는 대이변을 쓴 돌풍의 주역입니다.',
    topScorers: [{ rank: 1, name: '마누체흐르 드잘리로프', stat: 20 }, { rank: 2, name: '유수프 라비에프', stat: 15 }, { rank: 3, name: '누리딘 다브로노프', stat: 8 }],
    topAssists: [{ rank: 1, name: '알리셰르 잘릴로프', stat: 7 }, { rank: 2, name: '파르비존 우마르바예프', stat: 6 }, { rank: 3, name: '아흐탐 나자로프', stat: 5 }], honors: ['AFC 챌린지컵 우승 1회']
  },
  {
    id: 'kg', name: '키르기스스탄', confederation: 'AFC', manager: '막심 리시친', captain: '발레리 키친', description: '흰 매. 유라시아의 우수한 신체조건을 살린 선 굵은 역습 축구가 주무기입니다.',
    topScorers: [{ rank: 1, name: '미를란 무르자예프', stat: 16 }, { rank: 2, name: '안톤 젬랴누힌', stat: 13 }, { rank: 3, name: '조엘 코조', stat: 8 }],
    topAssists: [{ rank: 1, name: '파하드 무사베코프', stat: 6 }, { rank: 2, name: '오딜존 압두라흐마노프', stat: 5 }, { rank: 3, name: '알리마르돈 슈쿠로프', stat: 4 }], honors: ['없음']
  },
  {
    id: 'tm', name: '투르크메니스탄', confederation: 'AFC', manager: '메르겐 오라조프', captain: '아르슬란미라트 아마노프', description: '초록색 전사들. 자국 리그 출신들이 중심이 된 끈끈한 조직력이 특징입니다.',
    topScorers: [{ rank: 1, name: '블라디미르 바이라모프', stat: 16 }, { rank: 2, name: '아르슬란미라트 아마노프', stat: 14 }, { rank: 3, name: '차리야르 무하도프', stat: 13 }],
    topAssists: [{ rank: 1, name: '아르슬란미라트 아마노프', stat: 8 }, { rank: 2, name: '아르투르 게보르키안', stat: 6 }, { rank: 3, name: '루슬란 민가조프', stat: 5 }], honors: ['없음']
  },
  {
    id: 'kw', name: '쿠웨이트', confederation: 'AFC', manager: '후안 안토니오 피찌', captain: '파하드 알 하제리', description: '알 아즈라크. 과거 아시안컵을 제패했던 80년대 아시아 축구의 최강자 중 하나였습니다.',
    topScorers: [{ rank: 1, name: '바샤르 압둘라', stat: 75 }, { rank: 2, name: '자셈 알 야쿠브', stat: 36 }, { rank: 3, name: '유세프 나세르', stat: 30 }],
    topAssists: [{ rank: 1, name: '바데르 알 무타와', stat: 30 }, { rank: 2, name: '압둘라지즈 알 안자리', stat: 15 }, { rank: 3, name: '유세프 나세르', stat: 10 }], honors: ['AFC 아시안컵 우승 1회']
  },
  {
    id: 'ye', name: '예멘', confederation: 'AFC', manager: '누레딘 울드 알리', captain: '아메드 알 사로리', description: '알 야멘 아사이드. 내전의 아픔 속에서도 축구에 대한 강한 열정을 이어가고 있습니다.',
    topScorers: [{ rank: 1, name: '알리 알 노노', stat: 29 }, { rank: 2, name: '압둘와시아 알 마타리', stat: 9 }, { rank: 3, name: '아이만 알 하그리', stat: 8 }],
    topAssists: [{ rank: 1, name: '알라 알 사시', stat: 6 }, { rank: 2, name: '압둘와시아 알 마타리', stat: 5 }, { rank: 3, name: '오마르 알 다히', stat: 4 }], honors: ['없음']
  },
  {
    id: 'kp', name: '북한', confederation: 'AFC', manager: '신영남', captain: '정일관', description: '천리마. 1966년과 2010년 월드컵 본선에 진출했던 폐쇄적이지만 저력 있는 팀입니다.',
    topScorers: [{ rank: 1, name: '정일관', stat: 30 }, { rank: 2, name: '박승진', stat: 25 }, { rank: 3, name: '한광성', stat: 15 }],
    topAssists: [{ rank: 1, name: '안영학', stat: 8 }, { rank: 2, name: '정일관', stat: 6 }, { rank: 3, name: '리용직', stat: 5 }], honors: ['AFC 챌린지컵 우승 2회']
  },
  {
    id: 'ph', name: '필리핀', confederation: 'AFC', manager: '알베르트 카펠라스', captain: '닐 에더리지', description: '아스칼스. 해외 혼혈 선수들을 적극 기용하며 동남아시아에서 다크호스로 부상했습니다.',
    topScorers: [{ rank: 1, name: '필 영허즈번드', stat: 52 }, { rank: 2, name: '치에프 이안', stat: 16 }, { rank: 3, name: '마르크 하트만', stat: 15 }],
    topAssists: [{ rank: 1, name: '제임스 영허즈번드', stat: 15 }, { rank: 2, name: '스테판 슈뢰크', stat: 12 }, { rank: 3, name: '파트릭 라이헬트', stat: 8 }], honors: ['AFC 챌린지컵 2위']
  },
  {
    id: 'hk', name: '홍콩', confederation: 'AFC', manager: '애슐리 웨스트우드', captain: '야프 훙 파이', description: '용. 귀화 선수들을 적절히 활용하여 2023 아시안컵 본선에 진출하는 저력을 보였습니다.',
    topScorers: [{ rank: 1, name: '찬 시우 키', stat: 40 }, { rank: 2, name: '황 웨이', stat: 15 }, { rank: 3, name: '맷 오어', stat: 10 }],
    topAssists: [{ rank: 1, name: '황 양', stat: 9 }, { rank: 2, name: '램 카 웨이', stat: 8 }, { rank: 3, name: '주잉지', stat: 6 }], honors: ['동아시아 경기 대회 금메달 1회']
  },
  {
    id: 'sg', name: '싱가포르', confederation: 'AFC', manager: '오구라 쓰토무', captain: '하리스 하룬', description: '사자. 스즈키컵 최다 우승국 반열에 올라 있는 동남아시아의 전통 강호입니다.',
    topScorers: [{ rank: 1, name: '판디 아흐마드', stat: 55 }, { rank: 2, name: '카이룰 암리', stat: 32 }, { rank: 3, name: '이크산 판디', stat: 18 }],
    topAssists: [{ rank: 1, name: '샤흐릴 이샥', stat: 14 }, { rank: 2, name: '사푸완 바하루딘', stat: 10 }, { rank: 3, name: '하리스 하룬', stat: 8 }], honors: ['AFF 미쓰비시전기컵 우승 4회']
  },

// ================= [ UEFA (유럽) - 30개국 (최신 감독/주장 및 Top 3 완벽 반영) ] =================
  {
    id: 'fr', name: '프랑스', confederation: 'UEFA', manager: '디디에 데샹', captain: '킬리안 음바페', description: '레 블뢰. 압도적인 스쿼드를 자랑하며 월드컵 2회 우승에 빛나는 세계 최고의 팀입니다.',
    topScorers: [{ rank: 1, name: '올리비에 지루', stat: 57 }, { rank: 2, name: '티에리 앙리', stat: 51 }, { rank: 3, name: '킬리안 음바페', stat: 48 }],
    topAssists: [{ rank: 1, name: '앙투안 그리즈만', stat: 30 }, { rank: 2, name: '티에리 앙리', stat: 27 }, { rank: 3, name: '지네딘 지단', stat: 26 }], honors: ['FIFA 월드컵 우승 2회', 'UEFA 유로 우승 2회']
  },
  {
    id: 'gb-eng', name: '잉글랜드', confederation: 'UEFA', manager: '토마스 투헬', captain: '해리 케인', description: '삼사자 군단. 토마스 투헬 감독 부임 이후 메이저 대회 우승의 숙원을 풀기 위해 나섭니다.',
    topScorers: [{ rank: 1, name: '해리 케인', stat: 68 }, { rank: 2, name: '웨인 루니', stat: 53 }, { rank: 3, name: '바비 찰튼', stat: 49 }],
    topAssists: [{ rank: 1, name: '데이비드 베컴', stat: 42 }, { rank: 2, name: '해리 케인', stat: 19 }, { rank: 3, name: '스티븐 제라드', stat: 15 }], honors: ['FIFA 월드컵 우승 1회']
  },
  {
    id: 'es', name: '스페인', confederation: 'UEFA', manager: '루이스 데 라 푸엔테', captain: '알바로 모라타', description: '무적함대. 유로 2024를 제패하며 무적함대의 화려한 부활을 알렸습니다.',
    topScorers: [{ rank: 1, name: '다비드 비야', stat: 59 }, { rank: 2, name: '라울 곤살레스', stat: 44 }, { rank: 3, name: '페르난도 토레스', stat: 38 }],
    topAssists: [{ rank: 1, name: '세스크 파브레가스', stat: 36 }, { rank: 2, name: '다비드 실바', stat: 32 }, { rank: 3, name: '사비 에르난데스', stat: 24 }], honors: ['FIFA 월드컵 우승 1회', 'UEFA 유로 우승 4회']
  },
  {
    id: 'de', name: '독일', confederation: 'UEFA', manager: '율리안 나겔스만', captain: '요주아 키미히', description: '디 만샤프트. 나겔스만 감독과 새 주장 키미히 체제로 전차군단의 세대교체를 이룩했습니다.',
    topScorers: [{ rank: 1, name: '미로슬라프 클로제', stat: 71 }, { rank: 2, name: '게르트 뮐러', stat: 68 }, { rank: 3, name: '루카스 포돌스키', stat: 49 }],
    topAssists: [{ rank: 1, name: '토마스 뮐러', stat: 40 }, { rank: 2, name: '메수트 외질', stat: 40 }, { rank: 3, name: '바스티안 슈바인슈타이거', stat: 39 }], honors: ['FIFA 월드컵 우승 4회', 'UEFA 유로 우승 3회']
  },
  {
    id: 'pt', name: '포르투갈', confederation: 'UEFA', manager: '로베르토 마르티네스', captain: '크리스티아누 호날두', description: '유럽의 브라질. 역대 A매치 최다 득점자 호날두와 황금세대가 이끄는 강호입니다.',
    topScorers: [{ rank: 1, name: '크리스티아누 호날두', stat: 133 }, { rank: 2, name: '파울레타', stat: 47 }, { rank: 3, name: '에우제비오', stat: 41 }],
    topAssists: [{ rank: 1, name: '크리스티아누 호날두', stat: 46 }, { rank: 2, name: '루이스 피구', stat: 34 }, { rank: 3, name: '히카르두 콰레스마', stat: 24 }], honors: ['UEFA 유로 우승 1회', 'UEFA 네이션스리그 우승 1회']
  },
  {
    id: 'it', name: '이탈리아', confederation: 'UEFA', manager: '루치아노 스팔레티', captain: '잔루이지 돈나룸마', description: '아주리 군단. 빗장수비와 전술의 완성도를 바탕으로 유럽 무대 정상 탈환을 노립니다.',
    topScorers: [{ rank: 1, name: '루이지 리바', stat: 35 }, { rank: 2, name: '주세페 메아차', stat: 33 }, { rank: 3, name: '실비오 피올라', stat: 30 }],
    topAssists: [{ rank: 1, name: '안드레아 피를로', stat: 23 }, { rank: 2, name: '프란체스코 토티', stat: 19 }, { rank: 3, name: '로베르토 바조', stat: 15 }], honors: ['FIFA 월드컵 우승 4회', 'UEFA 유로 우승 2회']
  },
  {
    id: 'nl', name: '네덜란드', confederation: 'UEFA', manager: '로날드 쿠만', captain: '버질 반 다이크', description: '오렌지 군단. 막강한 수비진과 다이내믹한 공격 축구를 구사하는 토털 사커의 발상지입니다.',
    topScorers: [{ rank: 1, name: '로빈 반 페르시', stat: 50 }, { rank: 2, name: '멤피스 데파이', stat: 46 }, { rank: 3, name: '클라스얀 휜텔라르', stat: 42 }],
    topAssists: [{ rank: 1, name: '베슬리 스나이더', stat: 33 }, { rank: 2, name: '아르옌 로벤', stat: 29 }, { rank: 3, name: '라파엘 반 더 바르트', stat: 23 }], honors: ['UEFA 유로 우승 1회']
  },
  {
    id: 'be', name: '벨기에', confederation: 'UEFA', manager: '도메니코 테데스코', captain: '케빈 더 브라위너', description: '붉은 악마. 더 브라위너를 중심으로 날카로운 역습을 전개하는 강팀입니다.',
    topScorers: [{ rank: 1, name: '로멜루 루카쿠', stat: 85 }, { rank: 2, name: '에덴 아자르', stat: 33 }, { rank: 3, name: '드리스 메르텐스', stat: 21 }],
    topAssists: [{ rank: 1, name: '케빈 더 브라위너', stat: 49 }, { rank: 2, name: '에덴 아자르', stat: 36 }, { rank: 3, name: '드리스 메르텐스', stat: 31 }], honors: ['올림픽 축구 금메달 1회']
  },
  {
    id: 'hr', name: '크로아티아', confederation: 'UEFA', manager: '즐라트코 다리치', captain: '루카 모드리치', description: '발칸의 전사들. 중원의 지배자 모드리치와 함께 끈적한 조직력을 뽐내는 팀입니다.',
    topScorers: [{ rank: 1, name: '다보르 슈케르', stat: 45 }, { rank: 2, name: '이반 페리시치', stat: 33 }, { rank: 3, name: '마리오 만주키치', stat: 33 }],
    topAssists: [{ rank: 1, name: '이반 페리시치', stat: 28 }, { rank: 2, name: '루카 모드리치', stat: 27 }, { rank: 3, name: '다리요 스르나', stat: 22 }], honors: ['FIFA 월드컵 준우승 1회']
  },
  {
    id: 'dk', name: '덴마크', confederation: 'UEFA', manager: '브리안 리머', captain: '피에르에밀 호이비에르', description: '대니시 다이너마이트. 리머 감독 체제에서 북유럽 특유의 조직력과 투지를 이어갑니다.',
    topScorers: [{ rank: 1, name: '욘 달 토마손', stat: 52 }, { rank: 2, name: '포울 닐센', stat: 52 }, { rank: 3, name: '크리스티안 에릭센', stat: 42 }],
    topAssists: [{ rank: 1, name: '크리스티안 에릭센', stat: 39 }, { rank: 2, name: '미카엘 라우드루프', stat: 38 }, { rank: 3, name: '니클라스 벤트너', stat: 18 }], honors: ['UEFA 유로 우승 1회']
  },
  {
    id: 'ch', name: '스위스', confederation: 'UEFA', manager: '무라트 야킨', captain: '그라니트 자카', description: '나티. 자카를 중심으로 탄탄한 수비 밸런스를 유지하며 메이저 대회 단골 16강 진출국입니다.',
    topScorers: [{ rank: 1, name: '알렉산더 프라이', stat: 42 }, { rank: 2, name: '쿠빌라이 투르킬마즈', stat: 34 }, { rank: 3, name: '제르단 샤키리', stat: 32 }],
    topAssists: [{ rank: 1, name: '제르단 샤키리', stat: 32 }, { rank: 2, name: '리카르도 로드리게스', stat: 22 }, { rank: 3, name: '그라니트 자카', stat: 12 }], honors: ['올림픽 축구 은메달 1회']
  },
  {
    id: 'rs', name: '세르비아', confederation: 'UEFA', manager: '드라간 스토이코비치', captain: '알렉산다르 미트로비치', description: '발칸의 브라질. 강력한 피지컬을 보유한 스트라이커들을 앞세워 파괴력을 과시합니다.',
    topScorers: [{ rank: 1, name: '알렉산다르 미트로비치', stat: 59 }, { rank: 2, name: '두산 타디치', stat: 23 }, { rank: 3, name: '두산 블라호비치', stat: 13 }],
    topAssists: [{ rank: 1, name: '두산 타디치', stat: 40 }, { rank: 2, name: '필립 코스티치', stat: 11 }, { rank: 3, name: '니콜라 지기치', stat: 10 }], honors: ['없음']
  },
  {
    id: 'pl', name: '폴란드', confederation: 'UEFA', manager: '미하우 프로비에시', captain: '로베르트 레반도프스키', description: '하얀 독수리. 세계 최고의 스트라이커 레반도프스키의 득점력에 의존하는 동유럽 팀입니다.',
    topScorers: [{ rank: 1, name: '로베르트 레반도프스키', stat: 84 }, { rank: 2, name: '브워지미에시 루반스키', stat: 48 }, { rank: 3, name: '그제고시 라토', stat: 45 }],
    topAssists: [{ rank: 1, name: '야쿠프 브와슈치코프스키', stat: 21 }, { rank: 2, name: '로베르트 레반도프스키', stat: 20 }, { rank: 3, name: '카밀 그로시츠키', stat: 20 }], honors: ['올림픽 축구 금메달 1회']
  },
  {
    id: 'ua', name: '우크라이나', confederation: 'UEFA', manager: '세르히 레브로프', captain: '안드리 야르몰렌코', description: '황색과 청색. 무드리크 등 빠른 윙어들을 활용한 매서운 측면 공격이 돋보입니다.',
    topScorers: [{ rank: 1, name: '안드리 셰브첸코', stat: 48 }, { rank: 2, name: '안드리 야르몰렌코', stat: 46 }, { rank: 3, name: '예브헨 코노플랸카', stat: 21 }],
    topAssists: [{ rank: 1, name: '안드리 야르몰렌코', stat: 26 }, { rank: 2, name: '안드리 셰브첸코', stat: 22 }, { rank: 3, name: '예브헨 코노플랸카', stat: 15 }], honors: ['없음']
  },
  {
    id: 'se', name: '스웨덴', confederation: 'UEFA', manager: '욘 달 토마손', captain: '빅토르 린델뢰프', description: '블라굴트. 최전방 이사크와 쿨루셉스키를 필두로 새로운 공격 편대를 구축했습니다.',
    topScorers: [{ rank: 1, name: '즐라탄 이브라히모비치', stat: 62 }, { rank: 2, name: '스벤 리델', stat: 49 }, { rank: 3, name: '군나르 노르달', stat: 43 }],
    topAssists: [{ rank: 1, name: '세바스티안 라르손', stat: 22 }, { rank: 2, name: '즐라탄 이브라히모비치', stat: 19 }, { rank: 3, name: '킴 셸스트룀', stat: 18 }], honors: ['올림픽 축구 금메달 1회']
  },
  {
    id: 'gb-wls', name: '웨일스', confederation: 'UEFA', manager: '크레이그 벨라미', captain: '에런 램지', description: '드래곤즈. 가레스 베일 은퇴 이후 크레이그 벨라미 체제에서 새로운 도약을 꿈꿉니다.',
    topScorers: [{ rank: 1, name: '가레스 베일', stat: 41 }, { rank: 2, name: '이언 러시', stat: 28 }, { rank: 3, name: '키퍼 무어', stat: 13 }],
    topAssists: [{ rank: 1, name: '가레스 베일', stat: 22 }, { rank: 2, name: '에런 램지', stat: 16 }, { rank: 3, name: '조 앨런', stat: 6 }], honors: ['없음']
  },
  {
    id: 'at', name: '오스트리아', confederation: 'UEFA', manager: '랄프 랑닉', captain: '다비드 알라바', description: '다스 팀. 랄프 랑닉 감독의 맹렬한 게겐프레싱으로 무장한 다크호스입니다.',
    topScorers: [{ rank: 1, name: '토니 폴스터', stat: 44 }, { rank: 2, name: '한스 크랑클', stat: 34 }, { rank: 3, name: '마르크 얀코', stat: 28 }],
    topAssists: [{ rank: 1, name: '다비드 알라바', stat: 18 }, { rank: 2, name: '마르코 아르나우토비치', stat: 17 }, { rank: 3, name: '마르셀 자비처', stat: 13 }], honors: ['없음']
  },
  {
    id: 'hu', name: '헝가리', confederation: 'UEFA', manager: '마르코 로시', captain: '도미니크 소보슬라이', description: '마자르 마법사. 캡틴 소보슬라이의 킥력을 앞세워 유럽 강호들을 위협합니다.',
    topScorers: [{ rank: 1, name: '페렌츠 푸스카스', stat: 84 }, { rank: 2, name: '샨도르 코치시', stat: 75 }, { rank: 3, name: '임레 슐로세르', stat: 59 }],
    topAssists: [{ rank: 1, name: '벌라주 주자크', stat: 16 }, { rank: 2, name: '도미니크 소보슬라이', stat: 15 }, { rank: 3, name: '플로리안 알베르트', stat: 9 }], honors: ['올림픽 축구 금메달 3회']
  },
  {
    id: 'gb-sct', name: '스코틀랜드', confederation: 'UEFA', manager: '스티브 클라크', captain: '앤드루 로버트슨', description: '타탄 아미. 강인한 투지와 측면 풀백들의 공격 가담이 위협적인 영국 연방 국가입니다.',
    topScorers: [{ rank: 1, name: '데니스 로', stat: 30 }, { rank: 2, name: '케니 달글리시', stat: 30 }, { rank: 3, name: '휴이 갤러처', stat: 24 }],
    topAssists: [{ rank: 1, name: '존 맥긴', stat: 11 }, { rank: 2, name: '앤드루 로버트슨', stat: 9 }, { rank: 3, name: '제임스 맥파든', stat: 8 }], honors: ['없음']
  },
  {
    id: 'cz', name: '체코', confederation: 'UEFA', manager: '이반 하셰크', captain: '토마시 수체크', description: '기관차. 토마시 수체크 등 장신 선수들을 활용한 세트피스 한방이 강력합니다.',
    topScorers: [{ rank: 1, name: '얀 콜레르', stat: 55 }, { rank: 2, name: '밀란 바로시', stat: 41 }, { rank: 3, name: '파트리크 시크', stat: 20 }],
    topAssists: [{ rank: 1, name: '카렐 포보르스키', stat: 21 }, { rank: 2, name: '토마시 로시츠키', stat: 15 }, { rank: 3, name: '파벨 네드베드', stat: 12 }], honors: ['UEFA 유로 우승 1회 (체코슬로바키아 시절)']
  },
  {
    id: 'tr', name: '튀르키예', confederation: 'UEFA', manager: '빈첸초 몬텔라', captain: '하칸 찰하놀루', description: '초승달과 별. 아르다 귈러 등 황금 유망주들이 터지며 유럽 무대의 신흥 돌풍으로 떠올랐습니다.',
    topScorers: [{ rank: 1, name: '하칸 쉬퀴르', stat: 51 }, { rank: 2, name: '부락 이을마즈', stat: 31 }, { rank: 3, name: '레프테르 퀴취칸도니아디스', stat: 21 }],
    topAssists: [{ rank: 1, name: '하칸 찰하놀루', stat: 16 }, { rank: 2, name: '아르다 투란', stat: 14 }, { rank: 3, name: '부락 이을마즈', stat: 10 }], honors: ['FIFA 월드컵 3위 (2002)']
  },
  {
    id: 'no', name: '노르웨이', confederation: 'UEFA', manager: '스톨레 솔바켄', captain: '마르틴 외데고르', description: '바이킹. 괴물 홀란드가 역사상 최다 득점자에 등극하며 노르웨이 축구사를 다시 쓰고 있습니다.',
    topScorers: [{ rank: 1, name: '엘링 홀란드', stat: 34 }, { rank: 2, name: '예르겐 유베', stat: 33 }, { rank: 3, name: '욘 카레브', stat: 24 }],
    topAssists: [{ rank: 1, name: '마르틴 외데고르', stat: 12 }, { rank: 2, name: '토레 안드레 플로', stat: 10 }, { rank: 3, name: '욘 아르네 리세', stat: 9 }], honors: ['없음']
  },
  {
    id: 'sk', name: '슬로바키아', confederation: 'UEFA', manager: '프란체스코 칼초나', captain: '밀란 슈크리니아르', description: '팔콘스. 칼초나 감독 부임 후 단단한 수비와 효율적인 빌드업을 장착했습니다.',
    topScorers: [{ rank: 1, name: '마렉 함식', stat: 26 }, { rank: 2, name: '로베르트 비텍', stat: 23 }, { rank: 3, name: '실라르드 네메트', stat: 22 }],
    topAssists: [{ rank: 1, name: '마렉 함식', stat: 20 }, { rank: 2, name: '로베르트 마크', stat: 10 }, { rank: 3, name: '유라이 쿠츠카', stat: 9 }], honors: ['없음']
  },
  {
    id: 'ro', name: '루마니아', confederation: 'UEFA', manager: '미르체아 루체스쿠', captain: '니콜라에 스탄치우', description: '삼색기. 명장 루체스쿠 감독 체제에서 젊은 피들을 앞세워 부활을 꾀하고 있습니다.',
    topScorers: [{ rank: 1, name: '게오르게 하지', stat: 35 }, { rank: 2, name: '아드리안 무투', stat: 35 }, { rank: 3, name: '이울리우 보돌라', stat: 31 }],
    topAssists: [{ rank: 1, name: '게오르게 하지', stat: 23 }, { rank: 2, name: '아드리안 무투', stat: 10 }, { rank: 3, name: '니콜라에 스탄치우', stat: 9 }], honors: ['없음']
  },
  {
    id: 'gr', name: '그리스', confederation: 'UEFA', manager: '이반 요바노비치', captain: '아나스타시오스 바카세타스', description: '해적선. 견고한 수비벽과 효율적인 세트피스로 상대하기 가장 까다로운 팀 중 하나입니다.',
    topScorers: [{ rank: 1, name: '니코스 아나스토풀로스', stat: 29 }, { rank: 2, name: '안겔로스 하리스테아스', stat: 25 }, { rank: 3, name: '테오파니스 게카스', stat: 24 }],
    topAssists: [{ rank: 1, name: '코스타스 카추라니스', stat: 14 }, { rank: 2, name: '요르고스 카라구니스', stat: 11 }, { rank: 3, name: '바실리오스 치아르타스', stat: 10 }], honors: ['UEFA 유로 우승 1회 (2004)']
  },
  {
    id: 'ie', name: '아일랜드', confederation: 'UEFA', manager: '헤이미르 하들그림손', captain: '셰이머스 콜먼', description: '보이즈 인 그린. 아이슬란드의 돌풍을 이끌었던 하들그림손 감독과 함께 끈적한 축구를 선보입니다.',
    topScorers: [{ rank: 1, name: '로비 킨', stat: 68 }, { rank: 2, name: '나이얼 퀸', stat: 21 }, { rank: 3, name: '프랭크 스테이플턴', stat: 20 }],
    topAssists: [{ rank: 1, name: '데미안 더프', stat: 15 }, { rank: 2, name: '에이든 맥기디', stat: 13 }, { rank: 3, name: '로비 킨', stat: 11 }], honors: ['없음']
  },
  {
    id: 'si', name: '슬로베니아', confederation: 'UEFA', manager: '마티아즈 케크', captain: '얀 오블락', description: '드래곤즈. 세계 최고의 골키퍼 얀 오블락과 벤자민 셰슈코 등 걸출한 스타를 배출했습니다.',
    topScorers: [{ rank: 1, name: '즐라트코 자호비치', stat: 35 }, { rank: 2, name: '밀리보예 노바코비치', stat: 32 }, { rank: 3, name: '요시프 일리치치', stat: 17 }],
    topAssists: [{ rank: 1, name: '요시프 일리치치', stat: 12 }, { rank: 2, name: '발테르 비르사', stat: 10 }, { rank: 3, name: '케빈 캄플', stat: 7 }], honors: ['없음']
  },
  {
    id: 'fi', name: '핀란드', confederation: 'UEFA', manager: '마르쿠 카네르바', captain: '루카스 흐라데키', description: '수리부엉이. 팀의 상징인 골잡이 티무 푸키를 중심으로 단단한 투지를 보여줍니다.',
    topScorers: [{ rank: 1, name: '티무 푸키', stat: 42 }, { rank: 2, name: '야리 리트마넨', stat: 32 }, { rank: 3, name: '미카엘 포르셀', stat: 29 }],
    topAssists: [{ rank: 1, name: '야리 리트마넨', stat: 18 }, { rank: 2, name: '티무 푸키', stat: 15 }, { rank: 3, name: '로만 에레멘코', stat: 10 }], honors: ['없음']
  },
  {
    id: 'is', name: '아이슬란드', confederation: 'UEFA', manager: '오게 하레이데', captain: '요한 베르그 구드문드손', description: '우리의 소년들. 얼음나라의 바이킹 박수와 함께 거친 피지컬 축구를 선보이는 북유럽의 복병입니다.',
    topScorers: [{ rank: 1, name: '길비 시구르드손', stat: 27 }, { rank: 2, name: '콜베인 시그토르손', stat: 26 }, { rank: 3, name: '에이두르 구드욘센', stat: 26 }],
    topAssists: [{ rank: 1, name: '길비 시구르드손', stat: 13 }, { rank: 2, name: '요한 베르그 구드문드손', stat: 10 }, { rank: 3, name: '카리 아르나손', stat: 6 }], honors: ['없음']
  },
  {
    id: 'ba', name: '보스니아 헤르체고비나', confederation: 'UEFA', manager: '세르게이 바르바레즈', captain: '에딘 제코', description: '드래곤. 영원한 전설 에딘 제코의 득점력을 앞세워 메이저 대회 본선을 노리는 발칸반도의 복병입니다.',
    topScorers: [{ rank: 1, name: '에딘 제코', stat: 65 }, { rank: 2, name: '베다드 이비셰비치', stat: 28 }, { rank: 3, name: '즈베즈단 미시모비치', stat: 25 }],
    topAssists: [{ rank: 1, name: '미랄렘 퍄니치', stat: 29 }, { rank: 2, name: '즈베즈단 미시모비치', stat: 23 }, { rank: 3, name: '에딘 제코', stat: 22 }], honors: ['없음']
  },
  // ================= [ CONMEBOL (남미) - 10개국 전체 (최신 감독/주장 및 Top 3 완벽 반영) ] =================
  {
    id: 'ar', name: '아르헨티나', confederation: 'CONMEBOL', manager: '리오넬 스칼로니', captain: '리오넬 메시', description: '라 알비셀레스테. 카타르 월드컵과 코파 아메리카 연속 우승으로 황금기를 구가하고 있습니다.',
    topScorers: [{ rank: 1, name: '리오넬 메시', stat: 109 }, { rank: 2, name: '가브리엘 바티스투타', stat: 56 }, { rank: 3, name: '세르히오 아구에로', stat: 41 }],
    topAssists: [{ rank: 1, name: '리오넬 메시', stat: 58 }, { rank: 2, name: '앙헬 디 마리아', stat: 29 }, { rank: 3, name: '디에고 마라도나', stat: 26 }], honors: ['FIFA 월드컵 우승 3회', '코파 아메리카 우승 15회']
  },
  {
    id: 'br', name: '브라질', confederation: 'CONMEBOL', manager: '도리바우 주니오르', captain: '다닐루', description: '셀레상. 전 세계에서 유일하게 월드컵 5회 우승을 달성한 영원한 영순위 우승 후보입니다.',
    topScorers: [{ rank: 1, name: '네이마르', stat: 79 }, { rank: 2, name: '펠레', stat: 77 }, { rank: 3, name: '호나우두', stat: 62 }],
    topAssists: [{ rank: 1, name: '네이마르', stat: 59 }, { rank: 2, name: '펠레', stat: 47 }, { rank: 3, name: '호나우지뉴', stat: 24 }], honors: ['FIFA 월드컵 우승 5회', '코파 아메리카 우승 9회']
  },
  {
    id: 'uy', name: '우루과이', confederation: 'CONMEBOL', manager: '마르셀로 비엘사', captain: '페데리코 발베르데', description: '라 셀레스테. 비엘사 감독 체제에서 강력한 압박과 기동력으로 남미 무대를 뒤흔들고 있습니다.',
    topScorers: [{ rank: 1, name: '루이스 수아레스', stat: 68 }, { rank: 2, name: '에딘손 카바니', stat: 58 }, { rank: 3, name: '디에고 포를란', stat: 36 }],
    topAssists: [{ rank: 1, name: '루이스 수아레스', stat: 39 }, { rank: 2, name: '디에고 포를란', stat: 20 }, { rank: 3, name: '에딘손 카바니', stat: 17 }], honors: ['FIFA 월드컵 우승 2회', '코파 아메리카 우승 15회']
  },
  {
    id: 'co', name: '콜롬비아', confederation: 'CONMEBOL', manager: '네스토르 로렌소', captain: '하메스 로드리게스', description: '로스 카페테로스. 하메스 로드리게스의 부활과 함께 화려한 공격력을 다시 뽐내고 있습니다.',
    topScorers: [{ rank: 1, name: '라다멜 팔카오', stat: 36 }, { rank: 2, name: '하메스 로드리게스', stat: 29 }, { rank: 3, name: '아르놀도 이과란', stat: 25 }],
    topAssists: [{ rank: 1, name: '하메스 로드리게스', stat: 28 }, { rank: 2, name: '카를로스 발데라마', stat: 16 }, { rank: 3, name: '후안 콰드라도', stat: 15 }], honors: ['코파 아메리카 우승 1회']
  },
  {
    id: 'cl', name: '칠레', confederation: 'CONMEBOL', manager: '리카르도 가레카', captain: '알렉시스 산체스', description: '라 로하. 황금 세대 이후 세대교체의 과도기를 겪으며 거친 투지를 이어가고 있습니다.',
    topScorers: [{ rank: 1, name: '알렉시스 산체스', stat: 51 }, { rank: 2, name: '에두아르도 바르가스', stat: 42 }, { rank: 3, name: '마르셀로 살라스', stat: 37 }],
    topAssists: [{ rank: 1, name: '알렉시스 산체스', stat: 41 }, { rank: 2, name: '아르투로 비달', stat: 23 }, { rank: 3, name: '호르헤 발디비아', stat: 20 }], honors: ['코파 아메리카 우승 2회']
  },
  {
    id: 'pe', name: '페루', confederation: 'CONMEBOL', manager: '호르헤 포사티', captain: '파올로 게레로', description: '라 블랑키로하. 포사티 감독과 함께 기술적인 패스 축구와 끈기를 바탕으로 강팀들을 괴롭힙니다.',
    topScorers: [{ rank: 1, name: '파올로 게레로', stat: 39 }, { rank: 2, name: '제퍼슨 파르판', stat: 27 }, { rank: 3, name: '테오필로 쿠비야스', stat: 26 }],
    topAssists: [{ rank: 1, name: '크리스티안 쿠에바', stat: 16 }, { rank: 2, name: '제퍼슨 파르판', stat: 13 }, { rank: 3, name: '놀베르토 솔라노', stat: 10 }], honors: ['코파 아메리카 우승 2회']
  },
  {
    id: 'ec', name: '에콰도르', confederation: 'CONMEBOL', manager: '세바스티안 베카세세', captain: '에네르 발렌시아', description: '라 트리. 베카세세 감독 체제에서 탄탄한 유스 시스템과 고산 지대 홈 이점을 십분 활용합니다.',
    topScorers: [{ rank: 1, name: '에네르 발렌시아', stat: 41 }, { rank: 2, name: '아구스틴 델가도', stat: 31 }, { rank: 3, name: '에두아르도 우르타도', stat: 26 }],
    topAssists: [{ rank: 1, name: '안토니오 발렌시아', stat: 11 }, { rank: 2, name: '크리스티안 노보아', stat: 10 }, { rank: 3, name: '아구스틴 델가도', stat: 8 }], honors: ['없음']
  },
  {
    id: 'py', name: '파라과이', confederation: 'CONMEBOL', manager: '구스타보 알파로', captain: '구스타보 고메스', description: '라 알비로하. 수비 특화 명장 알파로 감독이 지휘봉을 잡아 예전의 끈적함을 되찾고 있습니다.',
    topScorers: [{ rank: 1, name: '로케 산타 크루즈', stat: 32 }, { rank: 2, name: '호세 카르도소', stat: 25 }, { rank: 3, name: '크리스티안 리베로스', stat: 16 }],
    topAssists: [{ rank: 1, name: '프란시스코 아르세', stat: 14 }, { rank: 2, name: '훌리오 도스 산토스', stat: 13 }, { rank: 3, name: '미겔 알미론', stat: 11 }], honors: ['코파 아메리카 우승 2회']
  },
  {
    id: 've', name: '베네수엘라', confederation: 'CONMEBOL', manager: '페르난도 바티스타', captain: '토마스 링콘', description: '라 비노틴토. 남미 유일의 월드컵 미진출국이나 피지컬과 투지를 바탕으로 저력을 과시합니다.',
    topScorers: [{ rank: 1, name: '살로몬 론돈', stat: 41 }, { rank: 2, name: '후안 아랑고', stat: 22 }, { rank: 3, name: '호세프 마르티네스', stat: 14 }],
    topAssists: [{ rank: 1, name: '후안 아랑고', stat: 12 }, { rank: 2, name: '예페르손 소텔도', stat: 9 }, { rank: 3, name: '살로몬 론돈', stat: 8 }], honors: ['없음']
  },
  {
    id: 'bo', name: '볼리비아', confederation: 'CONMEBOL', manager: '오스카르 비예가스', captain: '루이스 아킨', description: '라 베르데. 해발 3,600m 라파스 홈경기는 세계 최강 브라질도 두려워하는 원정 무덤입니다.',
    topScorers: [{ rank: 1, name: '마르셀로 모레노', stat: 31 }, { rank: 2, name: '호아킨 보테로', stat: 20 }, { rank: 3, name: '빅토르 우고 안테로', stat: 20 }],
    topAssists: [{ rank: 1, name: '에르윈 산체스', stat: 15 }, { rank: 2, name: '훌리오 세자르 발디비에소', stat: 12 }, { rank: 3, name: '마르셀로 모레노', stat: 8 }], honors: ['코파 아메리카 우승 1회']
  },

 // ================= [ CONCACAF (북중미) - 30개국 (최신 감독/주장 및 Top 3 완벽 반영) ] =================
  {
    id: 'us', name: '미국', confederation: 'CONCACAF', manager: '마우리시오 포체티노', captain: '크리스티안 풀리식', description: '양키스. 포체티노 감독 부임 이후 자국에서 열리는 2026 월드컵 돌풍을 준비 중입니다.',
    topScorers: [{ rank: 1, name: '클린트 뎀프시', stat: 57 }, { rank: 2, name: '랜던 도노반', stat: 57 }, { rank: 3, name: '조지 알티도어', stat: 42 }],
    topAssists: [{ rank: 1, name: '랜던 도노반', stat: 58 }, { rank: 2, name: '마이클 브래들리', stat: 23 }, { rank: 3, name: '크리스티안 풀리식', stat: 17 }], honors: ['CONCACAF 골드컵 우승 7회', 'CONCACAF 네이션스리그 우승 3회']
  },
  {
    id: 'mx', name: '멕시코', confederation: 'CONCACAF', manager: '하비에르 아기레', captain: '에드손 알바레스', description: '엘 트리. 노련한 아기레 감독 체제에서 북중미 최강자의 자존심 회복을 노립니다.',
    topScorers: [{ rank: 1, name: '치차리토', stat: 52 }, { rank: 2, name: '하레드 보르헤티', stat: 46 }, { rank: 3, name: '콰우테모크 블랑코', stat: 38 }],
    topAssists: [{ rank: 1, name: '안드레스 과르다도', stat: 31 }, { rank: 2, name: '콰우테모크 블랑코', stat: 26 }, { rank: 3, name: '파벨 파르도', stat: 14 }], honors: ['CONCACAF 골드컵 우승 12회', '컨페더레이션스컵 우승 1회']
  },
  {
    id: 'ca', name: '캐나다', confederation: 'CONCACAF', manager: '제시 마치', captain: '알폰소 데이비스', description: '메이플 리프스. 제시 마치 감독 특유의 역동적인 압박 전술로 신흥 강호로 자리매김했습니다.',
    topScorers: [{ rank: 1, name: '사일 라린', stat: 30 }, { rank: 2, name: '조너선 데이비드', stat: 28 }, { rank: 3, name: '드웨인 데 로사리오', stat: 22 }],
    topAssists: [{ rank: 1, name: '알폰소 데이비스', stat: 18 }, { rank: 2, name: '주니어 호일렛', stat: 16 }, { rank: 3, name: '조너선 오소리오', stat: 10 }], honors: ['CONCACAF 골드컵 우승 2회']
  },
  {
    id: 'cr', name: '코스타리카', confederation: 'CONCACAF', manager: '클라우디오 비바스', captain: '프란시스코 칼보', description: '로스 티코스. 철벽 수비와 역습을 바탕으로 월드컵 단골 출전국의 명성을 잇고 있습니다.',
    topScorers: [{ rank: 1, name: '롤란도 폰세카', stat: 47 }, { rank: 2, name: '파울로 완초페', stat: 45 }, { rank: 3, name: '알바로 사보리오', stat: 36 }],
    topAssists: [{ rank: 1, name: '브라이언 루이스', stat: 23 }, { rank: 2, name: '셀소 보르헤스', stat: 18 }, { rank: 3, name: '조엘 캠벨', stat: 17 }], honors: ['CONCACAF 챔피언십 우승 3회']
  },
  {
    id: 'pa', name: '파나마', confederation: 'CONCACAF', manager: '토마스 크리스티안센', captain: '아니발 고도이', description: '로스 카날레로스. 탄탄한 조직력을 바탕으로 북중미 내셔널 대회에서 꾸준한 성적을 거둡니다.',
    topScorers: [{ rank: 1, name: '루이스 테하다', stat: 43 }, { rank: 2, name: '블라스 페레스', stat: 42 }, { rank: 3, name: '가브리엘 토레스', stat: 24 }],
    topAssists: [{ rank: 1, name: '가브리엘 고메스', stat: 11 }, { rank: 2, name: '에드가 바르세나스', stat: 10 }, { rank: 3, name: '알베르토 킨테로', stat: 9 }], honors: ['없음']
  },
  {
    id: 'jm', name: '자메이카', confederation: 'CONCACAF', manager: '스티브 맥클라렌', captain: '안드레 블레이크', description: '레게 보이즈. 잉글랜드 이중국적 선수들을 대거 영입하여 피지컬과 스피드가 압도적입니다.',
    topScorers: [{ rank: 1, name: '루턴 셸턴', stat: 35 }, { rank: 2, name: '샤마 니콜슨', stat: 19 }, { rank: 3, name: '디온 버튼', stat: 13 }],
    topAssists: [{ rank: 1, name: '테오도르 휘트모어', stat: 12 }, { rank: 2, name: '레온 베일리', stat: 8 }, { rank: 3, name: '데미언 로우', stat: 5 }], honors: ['카리브컵 우승 6회']
  },
  {
    id: 'hn', name: '온두라스', confederation: 'CONCACAF', manager: '레이날도 루에다', captain: '안토니 로사노', description: '라 비코로르. 북중미 무대에서 거칠고 끈끈한 수비로 언제든 강팀들의 발목을 잡는 복병입니다.',
    topScorers: [{ rank: 1, name: '카를로스 파본', stat: 57 }, { rank: 2, name: '윌메르 벨라스케스', stat: 35 }, { rank: 3, name: '밀톤 누녜스', stat: 33 }],
    topAssists: [{ rank: 1, name: '아마도 게바라', stat: 15 }, { rank: 2, name: '훌리오 세자르 데 레온', stat: 10 }, { rank: 3, name: '라몬 누녜스', stat: 8 }], honors: ['CONCACAF 챔피언십 우승 1회']
  },
  {
    id: 'sv', name: '엘살바도르', confederation: 'CONCACAF', manager: '다비드 도니가', captain: '다르윈 세렌', description: '라 셀렉타. 작은 체구에도 불구하고 빠른 템포의 기술 축구로 승부를 보는 다크호스입니다.',
    topScorers: [{ rank: 1, name: '라울 디아스 아르세', stat: 39 }, { rank: 2, name: '마히코 곤살레스', stat: 21 }, { rank: 3, name: '로돌포 셀라야', stat: 21 }],
    topAssists: [{ rank: 1, name: '엘리세오 킨타니야', stat: 14 }, { rank: 2, name: '아르투로 알바레스', stat: 8 }, { rank: 3, name: '오사엘 로메로', stat: 7 }], honors: ['없음']
  },
  {
    id: 'ht', name: '아이티', confederation: 'CONCACAF', manager: '세바스티앵 미네', captain: '조니 플라시드', description: '레 그레나디에. 카리브해 연안의 전통 강호로 거친 플레이와 강한 투지가 특징입니다.',
    topScorers: [{ rank: 1, name: '이매뉴얼 사논', stat: 47 }, { rank: 2, name: '뒤캉 나종', stat: 28 }, { rank: 3, name: '골만 피에르', stat: 23 }],
    topAssists: [{ rank: 1, name: '뒤캉 나종', stat: 11 }, { rank: 2, name: '윌드 도날드 게리에', stat: 9 }, { rank: 3, name: '프랑츠디 피에로', stat: 8 }], honors: ['CONCACAF 챔피언십 우승 1회']
  },
  {
    id: 'tt', name: '트리니다드 토바고', confederation: 'CONCACAF', manager: '드와이트 요크', captain: '리바이 가르시아', description: '소카 워리어스. 맨유의 전설 드와이트 요크 감독 체제에서 새 도약을 꿈꾸고 있습니다.',
    topScorers: [{ rank: 1, name: '스턴 존', stat: 70 }, { rank: 2, name: '앵거스 이브', stat: 34 }, { rank: 3, name: '러셀 라타피', stat: 29 }],
    topAssists: [{ rank: 1, name: '러셀 라타피', stat: 17 }, { rank: 2, name: '칼림 하일랜드', stat: 10 }, { rank: 3, name: '리바이 가르시아', stat: 8 }], honors: ['카리브컵 우승 8회']
  },
  {
    id: 'gt', name: '과테말라', confederation: 'CONCACAF', manager: '루이스 페르난도 테나', captain: '호세 핀토', description: '로스 차피네스. 열정적인 홈팬들의 일방적인 지지를 받는 중앙아메리카의 복병입니다.',
    topScorers: [{ rank: 1, name: '카를로스 루이스', stat: 68 }, { rank: 2, name: '후안 카를로스 플라타', stat: 35 }, { rank: 3, name: '루비오 루빈', stat: 9 }],
    topAssists: [{ rank: 1, name: '마르코 파파', stat: 11 }, { rank: 2, name: '호세 마누엘 콘트레라스', stat: 9 }, { rank: 3, name: '프레디 톰슨', stat: 6 }], honors: ['CONCACAF 챔피언십 우승 1회']
  },
  {
    id: 'ni', name: '니카라과', confederation: 'CONCACAF', manager: '마르코 안토니오 피게로아', captain: '후안 바레라', description: '라 아술 이 블랑코. 자국 내 야구의 인기를 뛰어넘기 위해 축구 인프라가 빠르게 발전 중입니다.',
    topScorers: [{ rank: 1, name: '후안 바레라', stat: 24 }, { rank: 2, name: '에밀리오 팔라시오스', stat: 11 }, { rank: 3, name: '하이메 루이스', stat: 10 }],
    topAssists: [{ rank: 1, name: '바이런 보니야', stat: 5 }, { rank: 2, name: '카를로스 차바리아', stat: 4 }, { rank: 3, name: '호수에 키하노', stat: 4 }], honors: ['없음']
  },
  {
    id: 'cu', name: '쿠바', confederation: 'CONCACAF', manager: '유니엘리스 카스티요', captain: '아리첼 에르난데스', description: '과거 1938년 월드컵 8강에 진출했던 기록이 있는 카리브해의 역사적인 팀입니다.',
    topScorers: [{ rank: 1, name: '레스테르 모레', stat: 29 }, { rank: 2, name: '예니에르 마르케스', stat: 15 }, { rank: 3, name: '로베르토 리나레스', stat: 14 }],
    topAssists: [{ rank: 1, name: '예니에르 마르케스', stat: 10 }, { rank: 2, name: '아리첼 에르난데스', stat: 6 }, { rank: 3, name: '오넬 에르난데스', stat: 5 }], honors: ['카리브컵 우승 1회']
  },
  {
    id: 'do', name: '도미니카 공화국', confederation: 'CONCACAF', manager: '마르셀로 네베레스', captain: '장 카를로스 로페스', description: '로스 키스케야노스. 유스 시스템 개편을 통해 최근 연령별 대표팀부터 두각을 나타내고 있습니다.',
    topScorers: [{ rank: 1, name: '조나단 파냐', stat: 24 }, { rank: 2, name: '도르니 로메로', stat: 16 }, { rank: 3, name: '도밍고 페랄타', stat: 14 }],
    topAssists: [{ rank: 1, name: '에다를린 레예스', stat: 6 }, { rank: 2, name: '장 카를로스 로페스', stat: 5 }, { rank: 3, name: '에디슨 아스코나', stat: 4 }], honors: ['없음']
  },
  {
    id: 'cw', name: '퀴라소', confederation: 'CONCACAF', manager: '딕 아드보카트', captain: '쿠코 마르티나', description: '유럽 명장 아드보카트와 네덜란드계 이중국적 선수들을 대거 앞세운 신흥 다크호스입니다.',
    topScorers: [{ rank: 1, name: '랑겔로 양가', stat: 18 }, { rank: 2, name: '레안드로 바쿠나', stat: 14 }, { rank: 3, name: '게바로 네포무세노', stat: 8 }],
    topAssists: [{ rank: 1, name: '레안드로 바쿠나', stat: 9 }, { rank: 2, name: '켄지 고레', stat: 6 }, { rank: 3, name: '브랜들리 쿠와스', stat: 5 }], honors: ['카리브컵 우승 1회']
  },
  {
    id: 'sr', name: '수리남', confederation: 'CONCACAF', manager: '스탠리 멘조', captain: '셰랄도 베커', description: '지리적으로는 남미지만 북중미 연맹 소속으로 네덜란드 유스 출신들이 주축을 이룹니다.',
    topScorers: [{ rank: 1, name: '스테파노 라이셀', stat: 14 }, { rank: 2, name: '글레오필로 플리터', stat: 14 }, { rank: 3, name: '도라소 클라스', stat: 8 }],
    topAssists: [{ rank: 1, name: '글레오필로 플리터', stat: 6 }, { rank: 2, name: '셰랄도 베커', stat: 5 }, { rank: 3, name: '차론 체리', stat: 4 }], honors: ['없음']
  },
  {
    id: 'ag', name: '앤티가 바부다', confederation: 'CONCACAF', manager: '마이크렐 르이가트', captain: '퀸튼 그리피스', description: '베네보이즈. 카리브해 지역 예선에서 주로 활약하며 거친 수비를 보여주는 팀입니다.',
    topScorers: [{ rank: 1, name: '피터 바이어스', stat: 44 }, { rank: 2, name: '랜돌프 버튼', stat: 15 }, { rank: 3, name: '타말리 토마스', stat: 12 }],
    topAssists: [{ rank: 1, name: '키에런 무르타그', stat: 6 }, { rank: 2, name: '칼라움 자랄도-마틴', stat: 5 }, { rank: 3, name: '디안드레 비숍', stat: 4 }], honors: ['없음']
  },
  {
    id: 'gy', name: '가이아나', confederation: 'CONCACAF', manager: '자말 샤바즈', captain: '사무엘 콕스', description: '황금 표범들. 수리남과 마찬가지로 남미 대륙에 위치하나 축구는 북중미에서 경쟁합니다.',
    topScorers: [{ rank: 1, name: '나이절 코딩턴', stat: 18 }, { rank: 2, name: '그레고리 리처드슨', stat: 17 }, { rank: 3, name: '오마리 글래스고', stat: 16 }],
    topAssists: [{ rank: 1, name: '닐 단스', stat: 8 }, { rank: 2, name: '트레이언 봅', stat: 7 }, { rank: 3, name: '카델 다니엘', stat: 5 }], honors: ['없음']
  },
  {
    id: 'pr', name: '푸에르토리코', confederation: 'CONCACAF', manager: '찰리 오르티스', captain: '니콜라스 카르도나', description: '엘 우라칸 아술. 미국령으로 야구가 절대적 강세지만 축구 대표팀도 꾸준히 전력을 냅니다.',
    topScorers: [{ rank: 1, name: '엑토르 라모스', stat: 18 }, { rank: 2, name: '리카르도 리베라', stat: 14 }, { rank: 3, name: '에마누엘 디안드레아', stat: 8 }],
    topAssists: [{ rank: 1, name: '조셉 마레로', stat: 6 }, { rank: 2, name: '시드니 리베라', stat: 5 }, { rank: 3, name: '제럴드 디아즈', stat: 4 }], honors: ['없음']
  },
  {
    id: 'kn', name: '세인트키츠 네비스', confederation: 'CONCACAF', manager: '오스틴 허긴스', captain: '줄라니 아치볼드', description: '슈가 보이즈. 영국 하부리그 출신 선수들이 뭉쳐 2023 골드컵 본선 진출의 이변을 썼습니다.',
    topScorers: [{ rank: 1, name: '이언 레이크', stat: 20 }, { rank: 2, name: '키스 검스', stat: 19 }, { rank: 3, name: '해리 파나이오투', stat: 11 }],
    topAssists: [{ rank: 1, name: '로메인 소이어스', stat: 8 }, { rank: 2, name: '해리 파나이오투', stat: 7 }, { rank: 3, name: '티샨 한리', stat: 5 }], honors: ['없음']
  },
  {
    id: 'vc', name: '세인트빈센트 그레나딘', confederation: 'CONCACAF', manager: '에즈라 헨드릭슨', captain: '오알렉스 앤더슨', description: '빈시 히트. 1996년 골드컵 본선 진출 경험이 있는 카리브해의 복병입니다.',
    topScorers: [{ rank: 1, name: '샨델 사무엘', stat: 32 }, { rank: 2, name: '오알렉스 앤더슨', stat: 19 }, { rank: 3, name: '코넬리어스 스튜어트', stat: 18 }],
    topAssists: [{ rank: 1, name: '코넬리어스 스튜어트', stat: 8 }, { rank: 2, name: '마이런 사무엘', stat: 6 }, { rank: 3, name: '에메랄드 조지', stat: 5 }], honors: ['없음']
  },
  {
    id: 'lc', name: '세인트루시아', confederation: 'CONCACAF', manager: '스턴 존', captain: '커트 프레더릭', description: '피통스. 잉글랜드 하부리그 선수들을 주축으로 카리브해 예선에서 분전하고 있습니다.',
    topScorers: [{ rank: 1, name: '얼 진', stat: 20 }, { rank: 2, name: '타이터스 엘바', stat: 16 }, { rank: 3, name: '제빅 맥팔레인', stat: 8 }],
    topAssists: [{ rank: 1, name: '트레마인 폴', stat: 5 }, { rank: 2, name: '커트 프레더릭', stat: 4 }, { rank: 3, name: '레스터 조셉', stat: 4 }], honors: ['없음']
  },
  {
    id: 'gd', name: '그레나다', confederation: 'CONCACAF', manager: '테리 코너', captain: '샤본 브라운', description: '스파이스 보이즈. 골드컵에 수차례 진출하며 꾸준한 전력을 유지하고 있는 섬나라입니다.',
    topScorers: [{ rank: 1, name: '리키 찰스', stat: 37 }, { rank: 2, name: '자말 찰스', stat: 17 }, { rank: 3, name: '키슨 베인', stat: 17 }],
    topAssists: [{ rank: 1, name: '자말 찰스', stat: 7 }, { rank: 2, name: '로마 프랑크', stat: 5 }, { rank: 3, name: '아더 앙투안', stat: 4 }], honors: ['없음']
  },
  {
    id: 'bz', name: '벨리즈', confederation: 'CONCACAF', manager: '다비드 페레스', captain: '에브로이 트랩', description: '재규어스. 과테말라와 멕시코 사이에 위치해 있으며 수비 지향적인 전술을 구사합니다.',
    topScorers: [{ rank: 1, name: '디온 맥컬레이', stat: 28 }, { rank: 2, name: '엘로이 퀼렌', stat: 6 }, { rank: 3, name: '해리슨 로체스', stat: 5 }],
    topAssists: [{ rank: 1, name: '해리슨 로체스', stat: 5 }, { rank: 2, name: '다니엘 히메네스', stat: 4 }, { rank: 3, name: '이언 가이너', stat: 3 }], honors: ['없음']
  },
  {
    id: 'bb', name: '바베이도스', confederation: 'CONCACAF', manager: '에미 보이스', captain: '조모 해리스', description: '베이잔 트라이던츠. 카리브해에서 가장 열정적인 팬덤을 보유한 팀 중 하나입니다.',
    topScorers: [{ rank: 1, name: '르웰린 라일리', stat: 23 }, { rank: 2, name: '노먼 포드', stat: 17 }, { rank: 3, name: '마리오 하트', stat: 15 }],
    topAssists: [{ rank: 1, name: '존 마크 올브라이튼', stat: 6 }, { rank: 2, name: '라샤드 줄스', stat: 5 }, { rank: 3, name: '하단 홀리건', stat: 4 }], honors: ['없음']
  },
  {
    id: 'bm', name: '버뮤다', confederation: 'CONCACAF', manager: '마이클 파인들리', captain: '단테 레버록', description: '곰바 워리어스. 인구는 적지만 잉글랜드 리그 출신 나키 웰스 등이 전력을 탄탄하게 합니다.',
    topScorers: [{ rank: 1, name: '나키 웰스', stat: 17 }, { rank: 2, name: '숀 고터', stat: 16 }, { rank: 3, name: '존 배리 누섬', stat: 15 }],
    topAssists: [{ rank: 1, name: '제이코 루이스', stat: 7 }, { rank: 2, name: '레지 램', stat: 6 }, { rank: 3, name: '저스틴 도나와', stat: 5 }], honors: ['없음']
  },
  {
    id: 'bs', name: '바하마', confederation: 'CONCACAF', manager: '네스리 진', captain: '레슬리 세인트 플뢰르', description: '바하마스. 비치사커에서 강세를 보이나 최근 필드 축구 국가대표팀도 발전하고 있습니다.',
    topScorers: [{ rank: 1, name: '레슬리 세인트 플뢰르', stat: 13 }, { rank: 2, name: '테리 델란시', stat: 6 }, { rank: 3, name: '피터 줄미스', stat: 5 }],
    topAssists: [{ rank: 1, name: '테리 델란시', stat: 4 }, { rank: 2, name: '마르셀 조셉', stat: 3 }, { rank: 3, name: '카메론 헤플', stat: 3 }], honors: ['없음']
  },
  {
    id: 'ky', name: '케이맨 제도', confederation: 'CONCACAF', manager: '클라우디오 가르시아', captain: '라몬 실리', description: '터틀스. 북중미 네이션스리그 하부 리그에서 주로 뛰며 지역 축구 인프라를 다지고 있습니다.',
    topScorers: [{ rank: 1, name: '리 라문', stat: 12 }, { rank: 2, name: '마크 이뱅크스', stat: 6 }, { rank: 3, name: '조나 이뱅크스', stat: 4 }],
    topAssists: [{ rank: 1, name: '조나단 이뱅크스', stat: 3 }, { rank: 2, name: '매튜 수베란', stat: 2 }, { rank: 3, name: '마이클 마틴', stat: 2 }], honors: ['없음']
  },
  {
    id: 'ms', name: '몬트세랫', confederation: 'CONCACAF', manager: '리 보이어', captain: '라일 테일러', description: '에메랄드 보이즈. 인구 약 5천 명의 국가지만 잉글랜드 교포 선수들로 다크호스가 되었습니다.',
    topScorers: [{ rank: 1, name: '라일 테일러', stat: 12 }, { rank: 2, name: '브래들리 우즈 가네스', stat: 4 }, { rank: 3, name: '스펜서 위어 데일리', stat: 3 }],
    topAssists: [{ rank: 1, name: '알렉스 다이어', stat: 5 }, { rank: 2, name: '제임스 콤리', stat: 4 }, { rank: 3, name: '크레이그 브라함 바렛', stat: 3 }], honors: ['없음']
  },
  {
    id: 'dm', name: '도미니카 연방', confederation: 'CONCACAF', manager: '엘링턴 사빈', captain: '글렌슨 프린스', description: '자연의 섬. 지리적 인구적 한계에도 불구하고 카리브 축구 연맹 대회에 성실히 참여합니다.',
    topScorers: [{ rank: 1, name: '줄리언 웨이드', stat: 20 }, { rank: 2, name: '컬슨 벤자민', stat: 14 }, { rank: 3, name: '켈리 피터스', stat: 9 }],
    topAssists: [{ rank: 1, name: '켈릭슨 토마스', stat: 4 }, { rank: 2, name: '브리엘 토마스', stat: 3 }, { rank: 3, name: '채드 버트란드', stat: 3 }], honors: ['없음']
  },

// ================= [ CAF (아프리카) - 30개국 (최신 감독/주장 및 Top 3 완벽 반영) ] =================
  {
    id: 'sn', name: '세네갈', confederation: 'CAF', manager: '알리우 시세', captain: '칼리두 쿨리발리', description: '테란가의 사자들. 공수 밸런스가 완벽에 가까운 현재 아프리카 축구의 상징이자 강호입니다.',
    topScorers: [{ rank: 1, name: '사디오 마네', stat: 43 }, { rank: 2, name: '앙리 카마라', stat: 29 }, { rank: 3, name: '엘 하지 디우프', stat: 24 }],
    topAssists: [{ rank: 1, name: '사디오 마네', stat: 21 }, { rank: 2, name: '엘 하지 디우프', stat: 14 }, { rank: 3, name: '이스마일라 사르', stat: 12 }], honors: ['아프리카 네이션스컵 우승 1회']
  },
  {
    id: 'ma', name: '모로코', confederation: 'CAF', manager: '왈리드 레그라기', captain: '로맹 사이스', description: '아틀라스의 사자. 카타르 월드컵 4강 신화 이후 탄탄한 스쿼드를 바탕으로 전성기를 맞이했습니다.',
    topScorers: [{ rank: 1, name: '아메드 파라스', stat: 36 }, { rank: 2, name: '살라헤딘 바시르', stat: 27 }, { rank: 3, name: '하킴 지예흐', stat: 23 }],
    topAssists: [{ rank: 1, name: '하킴 지예흐', stat: 24 }, { rank: 2, name: '무스타파 하지', stat: 13 }, { rank: 3, name: '아슈라프 하키미', stat: 10 }], honors: ['아프리카 네이션스컵 우승 1회']
  },
  {
    id: 'eg', name: '이집트', confederation: 'CAF', manager: '호삼 하산', captain: '모하메드 살라', description: '파라오 군단. 자국 레전드 호삼 하산 감독 체제에서 살라를 필두로 아프리카 왕좌 탈환을 노립니다.',
    topScorers: [{ rank: 1, name: '호삼 하산', stat: 68 }, { rank: 2, name: '모하메드 살라', stat: 57 }, { rank: 3, name: '하산 엘 샤즐리', stat: 42 }],
    topAssists: [{ rank: 1, name: '모하메드 살라', stat: 30 }, { rank: 2, name: '모하메드 아부트리카', stat: 22 }, { rank: 3, name: '아흐메드 하산', stat: 15 }], honors: ['아프리카 네이션스컵 우승 7회']
  },
  {
    id: 'ci', name: '코트디부아르', confederation: 'CAF', manager: '에메르스 파에', captain: '세르주 오리에', description: '코끼리 군단. 2023 네이션스컵에서 기적적인 역전 우승을 차지하며 저력을 입증했습니다.',
    topScorers: [{ rank: 1, name: '디디에 드로그바', stat: 65 }, { rank: 2, name: '압둘라예 트라오레', stat: 50 }, { rank: 3, name: '살로몬 칼루', stat: 28 }],
    topAssists: [{ rank: 1, name: '야야 투레', stat: 18 }, { rank: 2, name: '제르비뉴', stat: 16 }, { rank: 3, name: '디디에 드로그바', stat: 14 }], honors: ['아프리카 네이션스컵 우승 3회']
  },
  {
    id: 'ng', name: '나이지리아', confederation: 'CAF', manager: '오거스틴 에구아보엔', captain: '윌리엄 트로스트 에콩', description: '슈퍼 이글스. 빅리그를 호령하는 폭발적인 공격수들을 끈임없이 배출하는 축구 강국입니다.',
    topScorers: [{ rank: 1, name: '라시디 예키니', stat: 37 }, { rank: 2, name: '세군 오데그바미', stat: 23 }, { rank: 3, name: '빅터 오시멘', stat: 21 }],
    topAssists: [{ rank: 1, name: '제이제이 오코차', stat: 15 }, { rank: 2, name: '은완쿼 카누', stat: 14 }, { rank: 3, name: '아메드 무사', stat: 13 }], honors: ['아프리카 네이션스컵 우승 3회', '올림픽 금메달 1회']
  },
  {
    id: 'dz', name: '알제리', confederation: 'CAF', manager: '블라디미르 페트코비치', captain: '리야드 마레즈', description: '사막의 여우들. 페트코비치 감독과 함께 유럽풍의 기술적이고 정교한 조직 축구를 구축 중입니다.',
    topScorers: [{ rank: 1, name: '이슬람 슬리마니', stat: 46 }, { rank: 2, name: '압델하피드 타스파우트', stat: 36 }, { rank: 3, name: '리야드 마레즈', stat: 31 }],
    topAssists: [{ rank: 1, name: '리야드 마레즈', stat: 40 }, { rank: 2, name: '이슬람 슬리마니', stat: 23 }, { rank: 3, name: '소피안 페굴리', stat: 20 }], honors: ['아프리카 네이션스컵 우승 2회']
  },
  {
    id: 'cm', name: '카메룬', confederation: 'CAF', manager: '마르크 브리스', captain: '뱅상 아부바카르', description: '불굴의 사자들. 아프리카 국가 최초 월드컵 8강 진출의 영광을 가진 역사적인 강호입니다.',
    topScorers: [{ rank: 1, name: '사무엘 에투', stat: 56 }, { rank: 2, name: '뱅상 아부바카르', stat: 39 }, { rank: 3, name: '로저 밀라', stat: 28 }],
    topAssists: [{ rank: 1, name: '로저 밀라', stat: 14 }, { rank: 2, name: '사무엘 에투', stat: 12 }, { rank: 3, name: '제레미 은지탑', stat: 11 }], honors: ['아프리카 네이션스컵 우승 5회', '올림픽 금메달 1회']
  },
  {
    id: 'gh', name: '가나', confederation: 'CAF', manager: '오토 아도', captain: '앙드레 아유', description: '블랙 스타즈. 풍부한 유스 시스템을 바탕으로 세대교체를 이뤄내고 있는 서아프리카의 터줏대감입니다.',
    topScorers: [{ rank: 1, name: '아사모아 기안', stat: 51 }, { rank: 2, name: '에드워드 아콰', stat: 45 }, { rank: 3, name: '앙드레 아유', stat: 24 }],
    topAssists: [{ rank: 1, name: '앙드레 아유', stat: 17 }, { rank: 2, name: '아사모아 기안', stat: 14 }, { rank: 3, name: '설리 문타리', stat: 11 }], honors: ['아프리카 네이션스컵 우승 4회']
  },
  {
    id: 'ml', name: '말리', confederation: 'CAF', manager: '톰 생피에트', captain: '하마리 트라오레', description: '독수리들. 막강한 중원 장악력과 피지컬을 앞세워 아프리카 무대에서 꾸준한 성적을 냅니다.',
    topScorers: [{ rank: 1, name: '세이두 케이타', stat: 25 }, { rank: 2, name: '프레데릭 카누테', stat: 23 }, { rank: 3, name: '모디보 마이가', stat: 13 }],
    topAssists: [{ rank: 1, name: '이브 비수마', stat: 8 }, { rank: 2, name: '세이두 케이타', stat: 7 }, { rank: 3, name: '하마리 트라오레', stat: 6 }], honors: ['없음']
  },
  {
    id: 'tn', name: '튀니지', confederation: 'CAF', manager: '파우지 벤자르티', captain: '유세프 므사크니', description: '카르타고의 독수리들. 특유의 끈끈한 수비 밸런스로 월드컵 본선 단골 진출을 이뤄냅니다.',
    topScorers: [{ rank: 1, name: '이삼 제마', stat: 36 }, { rank: 2, name: '와흐비 카즈리', stat: 25 }, { rank: 3, name: '실바 도스 산토스', stat: 22 }],
    topAssists: [{ rank: 1, name: '와흐비 카즈리', stat: 14 }, { rank: 2, name: '유세프 므사크니', stat: 12 }, { rank: 3, name: '알리 말룰', stat: 10 }], honors: ['아프리카 네이션스컵 우승 1회']
  },
  {
    id: 'za', name: '남아프리카 공화국', confederation: 'CAF', manager: '우고 브로스', captain: '론웬 윌리엄스', description: '바파나 바파나. 자국 리그 선수들의 끈끈한 조직력을 바탕으로 네이션스컵 돌풍을 일으켰습니다.',
    topScorers: [{ rank: 1, name: '베니 맥카시', stat: 31 }, { rank: 2, name: '숀 바틀렛', stat: 28 }, { rank: 3, name: '카틀레고 음펠라', stat: 23 }],
    topAssists: [{ rank: 1, name: '시피웨 차발랄라', stat: 16 }, { rank: 2, name: '스티븐 피에나르', stat: 11 }, { rank: 3, name: '페르시 타우', stat: 9 }], honors: ['아프리카 네이션스컵 우승 1회']
  },
  {
    id: 'cd', name: '콩고 민주 공화국', confederation: 'CAF', manager: '세바스티앙 데사브르', captain: '찬셀 음벰바', description: '표범들. 거친 피지컬과 기술적인 2세 선수들이 조화되어 강력한 전력을 구축했습니다.',
    topScorers: [{ rank: 1, name: '디우메르시 음보카니', stat: 22 }, { rank: 2, name: '세드릭 바캄부', stat: 16 }, { rank: 3, name: '샤바니 농다', stat: 14 }],
    topAssists: [{ rank: 1, name: '야닉 볼라시에', stat: 11 }, { rank: 2, name: '트레저 음푸투', stat: 9 }, { rank: 3, name: '찬셀 음벰바', stat: 6 }], honors: ['아프리카 네이션스컵 우승 2회']
  },
  {
    id: 'bf', name: '부르키나파소', confederation: 'CAF', manager: '브라마 트라오레', captain: '베르트랑 트라오레', description: '종마들. 뛰어난 기동력을 바탕으로 네이션스컵에서 자주 토너먼트에 오르는 저력의 팀입니다.',
    topScorers: [{ rank: 1, name: '무무니 다가노', stat: 34 }, { rank: 2, name: '아리스티드 방세', stat: 24 }, { rank: 3, name: '알랭 트라오레', stat: 21 }],
    topAssists: [{ rank: 1, name: '알랭 트라오레', stat: 9 }, { rank: 2, name: '베르트랑 트라오레', stat: 8 }, { rank: 3, name: '샤를 카보레', stat: 7 }], honors: ['없음']
  },
  {
    id: 'gn', name: '기니', confederation: 'CAF', manager: '찰스 파킬레', captain: '나비 케이타', description: '실리 내셔널. 중원에 포진한 우수한 테크니션들을 통해 역동적인 축구를 펼칩니다.',
    topScorers: [{ rank: 1, name: '이브라히마 캉디아 디알로', stat: 33 }, { rank: 2, name: '티티 카마라', stat: 27 }, { rank: 3, name: '파스칼 페인두노', stat: 20 }],
    topAssists: [{ rank: 1, name: '나비 케이타', stat: 10 }, { rank: 2, name: '이시아가 실라', stat: 8 }, { rank: 3, name: '프랑수아 카마노', stat: 6 }], honors: ['없음']
  },
  {
    id: 'zm', name: '잠비아', confederation: 'CAF', manager: '아브람 그란트', captain: '루바보 무손다', description: '구리 총알들. 아브람 그란트 감독 체제에서 다시 아프리카 상위권 도약을 목표로 합니다.',
    topScorers: [{ rank: 1, name: '고드프리 치탈루', stat: 79 }, { rank: 2, name: '알렉스 찰웨', stat: 43 }, { rank: 3, name: '칼루샤 브왈라', stat: 39 }],
    topAssists: [{ rank: 1, name: '크리스토퍼 카통고', stat: 12 }, { rank: 2, name: '칼루샤 브왈라', stat: 10 }, { rank: 3, name: '에반스 캉와', stat: 8 }], honors: ['아프리카 네이션스컵 우승 1회']
  },
  {
    id: 'gq', name: '적도 기니', confederation: 'CAF', manager: '후안 미차', captain: '에밀리오 은수에', description: '국가 번개. 스페인 혼혈 선수들이 다수 합류하며 네이션스컵의 거물 잡는 킬러로 불립니다.',
    topScorers: [{ rank: 1, name: '에밀리오 은수에', stat: 23 }, { rank: 2, name: '후베날 에드조고', stat: 9 }, { rank: 3, name: '하비에르 발보아', stat: 5 }],
    topAssists: [{ rank: 1, name: '하비에르 발보아', stat: 6 }, { rank: 2, name: '에밀리오 은수에', stat: 5 }, { rank: 3, name: '파블로 가네트', stat: 4 }], honors: ['없음']
  },
  {
    id: 'cv', name: '카보베르데', confederation: 'CAF', manager: '부비스타', captain: '리안 멘데스', description: '푸른 상어. 포르투갈 교포 선수들을 필두로 짜임새 있는 조직력 축구를 구사합니다.',
    topScorers: [{ rank: 1, name: '리안 멘데스', stat: 17 }, { rank: 2, name: '줄리우 타바레스', stat: 8 }, { rank: 3, name: '엘돈 하무스', stat: 7 }],
    topAssists: [{ rank: 1, name: '줄리우 타바레스', stat: 5 }, { rank: 2, name: '리안 멘데스', stat: 5 }, { rank: 3, name: '가리 로드리게스', stat: 4 }], honors: ['없음']
  },
  {
    id: 'ga', name: '가봉', confederation: 'CAF', manager: '티에리 무유마', captain: '피에르에메릭 오바메양', description: '표범. 공격을 이끄는 레전드 오바메양과 함께 아프리카 무대에서 꾸준히 저항합니다.',
    topScorers: [{ rank: 1, name: '피에르에메릭 오바메양', stat: 31 }, { rank: 2, name: '말릭 에보우나', stat: 12 }, { rank: 3, name: '다니엘 쿠쟁', stat: 11 }],
    topAssists: [{ rank: 1, name: '데니스 부앙가', stat: 8 }, { rank: 2, name: '브루노 에쿠엘레 망가', stat: 5 }, { rank: 3, name: '마리오 르미나', stat: 4 }], honors: ['없음']
  },
  {
    id: 'ao', name: '앙골라', confederation: 'CAF', manager: '페드로 곤살베스', captain: '프레디', description: '검은 영양. 화끈한 공격력을 바탕으로 2006년 월드컵 본선 무대를 밟았던 저력이 있습니다.',
    topScorers: [{ rank: 1, name: '아크와', stat: 39 }, { rank: 2, name: '플라비우 아마두', stat: 34 }, { rank: 3, name: '마누초', stat: 22 }],
    topAssists: [{ rank: 1, name: '마테우스 갈리아누', stat: 7 }, { rank: 2, name: '질베르투', stat: 6 }, { rank: 3, name: '자우마 캄푸스', stat: 5 }], honors: ['없음']
  },
  {
    id: 'ug', name: '우간다', confederation: 'CAF', manager: '폴 퓌트', captain: '칼리드 아우초', description: '크레인. 압도적인 피지컬 수비 조직력을 바탕으로 동아프리카 축구의 맹주로 불립니다.',
    topScorers: [{ rank: 1, name: '마지드 무시시', stat: 29 }, { rank: 2, name: '이매뉴얼 오크위', stat: 26 }, { rank: 3, name: '제프리 마사', stat: 22 }],
    topAssists: [{ rank: 1, name: '파루크 미야', stat: 11 }, { rank: 2, name: '고드프리 발루쿠', stat: 7 }, { rank: 3, name: '조셉 오차야', stat: 6 }], honors: ['CECAFA 컵 우승 15회']
  },
  {
    id: 'bj', name: '베냉', confederation: 'CAF', manager: '게르노 로르', captain: '스티브 무니에', description: '다람쥐. 프랑스 무대에서 활약하는 스티브 무니에를 앞세워 강한 피지컬 축구를 선보입니다.',
    topScorers: [{ rank: 1, name: '스테판 세세뇽', stat: 24 }, { rank: 2, name: '미카엘 포테', stat: 10 }, { rank: 3, name: '스티브 무니에', stat: 14 }],
    topAssists: [{ rank: 1, name: '미카엘 포테', stat: 7 }, { rank: 2, name: '스테판 세세뇽', stat: 6 }, { rank: 3, name: '요델 도수', stat: 4 }], honors: ['없음']
  },
  {
    id: 'mr', name: '모리타니', confederation: 'CAF', manager: '아미르 압두', captain: '알리 아베이드', description: '무라비툰. 최근 네이션스컵에서 기적적인 결과를 만들어내며 가파르게 성장 중입니다.',
    topScorers: [{ rank: 1, name: '베사무', stat: 13 }, { rank: 2, name: '아부바카르 카마라', stat: 8 }, { rank: 3, name: '아다마 바', stat: 6 }],
    topAssists: [{ rank: 1, name: '아다마 바', stat: 5 }, { rank: 2, name: '베사무', stat: 4 }, { rank: 3, name: '하센 안느', stat: 3 }], honors: ['없음']
  },
  {
    id: 'ke', name: '케냐', confederation: 'CAF', manager: '엔긴 피랏', captain: '마이클 올룽가', description: '하람베 스타즈. 마라톤 강국 특유의 무한 체력과 거친 몸싸움을 바탕으로 뜁니다.',
    topScorers: [{ rank: 1, name: '데니스 올리치', stat: 34 }, { rank: 2, name: '마이클 올룽가', stat: 22 }, { rank: 3, name: '윌리엄 오마', stat: 21 }],
    topAssists: [{ rank: 1, name: '빅터 완야마', stat: 8 }, { rank: 2, name: '맥도널드 마리가', stat: 5 }, { rank: 3, name: '조안나 오몰로', stat: 4 }], honors: ['CECAFA 컵 우승 7회']
  },
  {
    id: 'cg', name: '콩고 공화국', confederation: 'CAF', manager: '아이작 응가타', captain: '티에비 비푸마', description: '붉은 악마들. 1970년대 아프리카 최강이었으며 현재 유럽파 선수들로 리빌딩을 진행 중입니다.',
    topScorers: [{ rank: 1, name: '티에비 비푸마', stat: 16 }, { rank: 2, name: '프랭스 오니앙게', stat: 8 }, { rank: 3, name: '가스통 참바', stat: 7 }],
    topAssists: [{ rank: 1, name: '프랭스 오니앙게', stat: 5 }, { rank: 2, name: '도렐 분쿠', stat: 4 }, { rank: 3, name: '티에비 비푸마', stat: 4 }], honors: ['아프리카 네이션스컵 우승 1회']
  },
  {
    id: 'mg', name: '마다가스카르', confederation: 'CAF', manager: '로무알드 라코톤드라베', captain: '이브라힘 아마다', description: '바리아. 2019년 네이션스컵에 첫 진출해 8강까지 오르는 대이변을 만들었던 돌풍의 팀입니다.',
    topScorers: [{ rank: 1, name: '파울린 보아비', stat: 15 }, { rank: 2, name: '파네바 이마 안드리아치마', stat: 14 }, { rank: 3, name: '자롤랑 코롬나카', stat: 8 }],
    topAssists: [{ rank: 1, name: '라얀 라벨로송', stat: 4 }, { rank: 2, name: '아니세 아벨', stat: 4 }, { rank: 3, name: '캐롤루스 안드리아마치노로', stat: 3 }], honors: ['없음']
  },
  {
    id: 'mz', name: '모잠비크', confederation: 'CAF', manager: '치퀴뉴 콘데', captain: '도밍게스', description: '맘바스. 에우제비오의 혈통을 가진 국가로, 뛰어난 기술을 지닌 다크호스입니다.',
    topScorers: [{ rank: 1, name: '티코-티코', stat: 27 }, { rank: 2, name: '도밍게스', stat: 16 }, { rank: 3, name: '다리우 몬테이루', stat: 16 }],
    topAssists: [{ rank: 1, name: '위티', stat: 6 }, { rank: 2, name: '도밍게스', stat: 5 }, { rank: 3, name: '스탠리 라티포', stat: 3 }], honors: ['없음']
  },
  {
    id: 'na', name: '나미비아', confederation: 'CAF', manager: '콜린 벤자민', captain: '피터 샬룰릴레', description: '용감한 전사들. 남아공 리그에서 뛰는 선수들이 주축을 이루어 투지가 매우 돋보입니다.',
    topScorers: [{ rank: 1, name: '피터 샬룰릴레', stat: 16 }, { rank: 2, name: '루돌프 베스터', stat: 13 }, { rank: 3, name: '제르베시어스 유리아크', stat: 11 }],
    topAssists: [{ rank: 1, name: '디온 호토', stat: 7 }, { rank: 2, name: '콜린 벤자민', stat: 4 }, { rank: 3, name: '피터 샬룰릴레', stat: 4 }], honors: ['없음']
  },
  {
    id: 'tg', name: '토고', confederation: 'CAF', manager: '다레 니봉베', captain: '제네 다코남', description: '참새. 에마뉘엘 아데바요르의 활약으로 2006년 월드컵에 진출했던 아프리카 서부 국가입니다.',
    topScorers: [{ rank: 1, name: '에마뉘엘 아데바요르', stat: 32 }, { rank: 2, name: '쿠바자 카데르', stat: 11 }, { rank: 3, name: '코두조 포도', stat: 10 }],
    topAssists: [{ rank: 1, name: '코두조 포도', stat: 9 }, { rank: 2, name: '알렉시스 로마오', stat: 6 }, { rank: 3, name: '제네 다코남', stat: 5 }], honors: ['없음']
  },
  {
    id: 'zw', name: '짐바브웨', confederation: 'CAF', manager: '마이클 니즈', captain: '마블러스 나캄바', description: '워리어스. 우월한 신체 능력을 갖추어 영국 등 해외 리그로 진출하는 선수가 많습니다.',
    topScorers: [{ rank: 1, name: '피터 은들로부', stat: 37 }, { rank: 2, name: '놀리지 무소나', stat: 28 }, { rank: 3, name: '카마 빌리앗', stat: 10 }],
    topAssists: [{ rank: 1, name: '놀리지 무소나', stat: 12 }, { rank: 2, name: '카마 빌리앗', stat: 8 }, { rank: 3, name: '티노 카데웨어', stat: 5 }], honors: ['COSAFA 컵 우승 6회']
  },
  {
    id: 'tz', name: '탄자니아', confederation: 'CAF', manager: '헤메드 모로코', captain: '음바와나 사마타', description: '타이파 스타즈. 잉글랜드 무대에서 뛰었던 사마타를 중심으로 조직력을 가다듬고 있습니다.',
    topScorers: [{ rank: 1, name: '음바와나 사마타', stat: 22 }, { rank: 2, name: '시몬 음수바', stat: 19 }, { rank: 3, name: '존 보코', stat: 16 }],
    topAssists: [{ rank: 1, name: '시몬 음수바', stat: 8 }, { rank: 2, name: '음바와나 사마타', stat: 6 }, { rank: 3, name: '피치 무달시리', stat: 4 }], honors: ['CECAFA 컵 우승 3회']
  }
];