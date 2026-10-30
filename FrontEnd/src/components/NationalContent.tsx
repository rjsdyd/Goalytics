// src/components/NationalContent.tsx
import { useState } from 'react';
import { wcWinnersHistory, fifaRankings, intlTopScorers, intlTopAssists, continentalWinners } from '../data/nationalData';

export default function NationalContent() {
  const [activeStatsTab, setActiveStatsTab] = useState<'scorers' | 'assists'>('scorers');
  const currentStatsData = activeStatsTab === 'scorers' ? intlTopScorers : intlTopAssists;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. 왼쪽: 역대 월드컵 우승팀 (보라색 테마) */}
      <div className="lg:col-span-4 bg-purple-900 text-white rounded-[32px] p-6 shadow-md h-[420px] flex flex-col relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] text-[150px] opacity-10 pointer-events-none">🌍</div>
        
        <div className="flex justify-between items-center mb-4 z-10">
          <h3 className="text-xl font-black tracking-wide">🏆 월드컵 우승국</h3>
        </div>
        
        <div className="flex flex-col gap-2 flex-1 z-10 overflow-y-auto pr-1">
          {wcWinnersHistory.map((winner, idx) => (
            <div key={idx} className="flex flex-col justify-center bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="font-black text-sm">{winner.team}</span>
                <span className="font-bold text-purple-200 text-sm">⭐ {winner.count}회</span>
              </div>
              <span className="text-[10px] text-purple-300 font-semibold mt-1">{winner.years}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 중앙: 피파(FIFA) 랭킹 */}
      <div className="lg:col-span-4 bg-white rounded-[32px] p-6 shadow-sm h-[420px] flex flex-col border-t-[10px] border-purple-900 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-purple-900 tracking-wide">📊 FIFA 랭킹</h3>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">Live</span>
        </div>

        <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-1">
          {fifaRankings.slice(0, 8).map(team => (
            <div key={team.rank} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <span className={`w-5 text-center font-black ${team.rank <= 3 ? 'text-purple-900' : 'text-gray-400'}`}>{team.rank}</span>
                <span className="font-bold text-sm text-gray-800">{team.team}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-gray-900">{team.pts}</span>
                {team.change === 'up' && <span className="text-red-500 text-xs">▲</span>}
                {team.change === 'down' && <span className="text-blue-500 text-xs">▼</span>}
                {team.change === 'same' && <span className="text-gray-300 text-xs">-</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 오른쪽: 상/하단 분할 뷰 (각각 200px 높이로 균형 맞춤) */}
      <div className="lg:col-span-4 flex flex-col gap-6 h-[420px]">
        
        {/* 오른쪽 상단: A매치 득점/도움 */}
        <div className="flex-1 bg-white rounded-[32px] p-5 shadow-sm border-t-[8px] border-purple-900 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-black text-purple-900">⚽ A매치 기록</h3>
            <div className="flex bg-gray-100 p-0.5 rounded-lg">
              <button onClick={() => setActiveStatsTab('scorers')} className={`px-2 py-1 text-[10px] font-bold rounded-md ${activeStatsTab === 'scorers' ? 'bg-purple-900 text-white' : 'text-gray-500'}`}>득점</button>
              <button onClick={() => setActiveStatsTab('assists')} className={`px-2 py-1 text-[10px] font-bold rounded-md ${activeStatsTab === 'assists' ? 'bg-purple-900 text-white' : 'text-gray-500'}`}>도움</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2">
            {currentStatsData.slice(0, 3).map(player => (
              <div key={player.rank} className="flex justify-between items-center border-b border-gray-50 pb-1">
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] text-gray-800">{player.name}</span>
                  <span className="text-[10px] text-gray-400 font-semibold">{player.team}</span>
                </div>
                <span className="font-black text-sm text-purple-900">{player.stat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 하단: 대륙별 컵대회 최근 우승팀 */}
        <div className="flex-1 bg-white rounded-[32px] p-5 shadow-sm border-t-[8px] border-purple-900 flex flex-col">
          <h3 className="text-md font-black text-purple-900 mb-3">🌏 대륙별 컵대회 우승</h3>
          <div className="flex-1 flex flex-col justify-center gap-2">
            {continentalWinners.map((cup, idx) => (
              <div key={idx} className="flex justify-between items-center bg-purple-50/50 px-3 py-1.5 rounded-xl">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold">{cup.tournament}</span>
                  <span className="font-black text-[13px] text-gray-900">{cup.winner}</span>
                </div>
                <span className="text-[11px] font-black text-purple-900 bg-white px-2 py-1 rounded-lg border border-purple-100">{cup.year}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}