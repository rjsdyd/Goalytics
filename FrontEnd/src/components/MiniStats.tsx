// src/components/MiniStats.tsx
import { useState } from 'react';
import { createPortal } from 'react-dom';
// 💡 새롭게 분리한 데이터 파일에서 상수들을 가져옵니다.
import { STATS_DATA, LEAGUE_KEYS } from '../data/leagueStatsData';
import type { LeagueKey } from '../data/leagueStatsData';

export default function TopStatsWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [activeLeague, setActiveLeague] = useState<LeagueKey>('ALL');
  const [activeTab, setActiveTab] = useState<'scorers' | 'assists'>('scorers');

  const topOverallScorer = STATS_DATA.ALL.scorers[0];
  const currentData = STATS_DATA[activeLeague][activeTab];

  return (
    <>
      <div className="bg-[#41e307] rounded-[32px] p-6 text-[#141b26] flex flex-col h-full min-h-[260px] shadow-sm">
        
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">Overall Top Scorer</h3>
        </div>

        <div className="flex-1 flex flex-col justify-center py-4">
          <h2 className="text-4xl font-black tracking-tight mb-2">{topOverallScorer.name}</h2>
          <p className="font-bold text-[#141b26]/70">5대 리그 통산 {topOverallScorer.stat}골</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 bg-[#141b26]/10 hover:bg-[#141b26]/20 text-[#141b26] rounded-xl font-bold transition mt-auto"
        >
          More
        </button>
      </div>

      {isModalOpen && createPortal(
        <div 
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[32px] w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
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
        </div>,
        document.body
      )}
    </>
  );
}