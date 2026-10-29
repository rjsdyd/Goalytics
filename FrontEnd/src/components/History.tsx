import { useEffect, useState } from 'react';
import axios from 'axios';

interface StandingData {
  team_id: number;
  season: number;
  rank: number;
  team_name: string;
  points: number;
  form: string;
}

const LEAGUES = [
  { id: 39, name: 'Premier League' },
  { id: 140, name: 'La Liga' },
  { id: 135, name: 'Serie A' },
  { id: 78, name: 'Bundesliga' },
  { id: 61, name: 'Ligue 1' },
];

export default function Standings() {
  const [latestStandings, setLatestStandings] = useState<StandingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // 모달 상태 관리 (기본 선택 리그 PL, 연도 2024로 설정)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);
  const [selectedSeason, setSelectedSeason] = useState<number>(2024);
  const [historyStandings, setHistoryStandings] = useState<StandingData[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  // 요청하신 대로 21, 25 시즌을 삭제하고 24, 23, 22만 남겼습니다.
  const seasons = [2024, 2023, 2022];

  // 1. 대시보드용 순위 로드 (2024 시즌 기준)
  useEffect(() => {
    axios.get('http://localhost:3000/football/standings/latest')
      .then(res => setLatestStandings(res.data))
      .catch(err => console.error('최신 순위 로드 실패:', err))
      .finally(() => setLoading(false));
  }, []);

  // 2. 모달창에서 리그나 연도 탭을 누를 때마다 해당 데이터 로드
  useEffect(() => {
    if (!isModalOpen) return;
    setHistoryLoading(true);
    // 리그 ID 쿼리 파라미터를 추가했습니다.
    axios.get(`http://localhost:3000/football/standings/history?season=${selectedSeason}&league=${selectedLeague.id}`)
      .then(res => setHistoryStandings(res.data))
      .catch(err => console.error('히스토리 순위 로드 실패:', err))
      .finally(() => setHistoryLoading(false));
  }, [isModalOpen, selectedSeason, selectedLeague.id]);

  const getStatusColor = (form: string) => {
    if (!form) return 'bg-gray-300';
    const recentResult = form.charAt(0);
    if (recentResult === 'W') return 'bg-[#41e307]';
    if (recentResult === 'L') return 'bg-red-500';
    return 'bg-gray-300';
  };

  return (
    <>
      {/* --- 대시보드 메인 컴포넌트 --- */}
      <div className="lg:col-span-3 bg-white rounded-[32px] p-8 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">History</h2>
          <button className="text-gray-400 hover:text-gray-800">&gt;</button>
        </div>
        
        {loading ? (
          <div className="flex-1 flex justify-center items-center text-sm text-gray-400 font-bold mb-6">
            데이터 로딩 중...
          </div>
        ) : (
          <ul className="space-y-4 mb-6 flex-1">
            {latestStandings.map((item) => (
              <li key={item.team_id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 truncate">
                  <span className={`w-4 font-bold ${item.rank <= 4 ? 'text-[#41e307]' : 'text-gray-400'}`}>
                    {item.rank}
                  </span>
                  <span className="font-semibold truncate max-w-[80px]">
                    {item.team_name.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">{item.points}</span>
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(item.form)}`}></span>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        {/* 모달 여는 버튼 */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-semibold text-gray-700 transition mt-auto"
        >
          View Full Table
        </button>
      </div>

      {/* --- View Full Table 모달 레이어 --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            
            {/* 모달 헤더 & 리그/연도 탭 */}
            <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                {/* 동적으로 선택된 리그 이름이 표시되도록 수정 */}
                <h2 className="text-2xl font-bold">{selectedLeague.name} History</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
              
              {/* 추가된 리그 선택 탭 */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {LEAGUES.map(league => (
                  <button
                    key={league.id}
                    onClick={() => setSelectedLeague(league)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${
                      selectedLeague.id === league.id ? 'bg-[#141b26] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {league.name}
                  </button>
                ))}
              </div>

              {/* 기존 연도 선택 탭 */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {seasons.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedSeason(year)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${
                      selectedSeason === year ? 'bg-[#41e307] text-[#141b26]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {year} Season
                  </button>
                ))}
              </div>
            </div>

            {/* 모달 컨텐츠 (순위표 리스트) */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {historyLoading ? (
                <div className="h-full flex items-center justify-center font-bold text-gray-400">데이터를 불러오는 중...</div>
              ) : historyStandings.length === 0 ? (
                <div className="h-full flex items-center justify-center font-bold text-gray-400">해당 시즌 데이터가 없습니다.</div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-4">
                  <div className="flex items-center text-xs font-bold text-gray-400 mb-4 px-2">
                    <div className="w-12 text-center">Rank</div>
                    <div className="flex-1">Club</div>
                    <div className="w-12 text-center">Pts</div>
                    <div className="w-20 text-center">Form</div>
                  </div>
                  {historyStandings.map((item) => (
                    <div key={item.team_id} className="flex items-center text-sm py-3 px-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition rounded-lg">
                      <div className={`w-12 text-center font-bold ${item.rank <= 4 ? 'text-[#41e307]' : 'text-gray-500'}`}>{item.rank}</div>
                      <div className="flex-1 font-semibold">{item.team_name}</div>
                      <div className="w-12 text-center font-black">{item.points}</div>
                      <div className="w-20 flex justify-center gap-1">
                        {item.form?.split('').slice(0, 5).map((f, idx) => (
                          <span key={idx} className={`w-2 h-2 rounded-full ${f === 'W' ? 'bg-[#41e307]' : f === 'L' ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}