// src/components/UELContent.tsx
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { uelWinnersHistory, uelTopScorers, uelTopAssists, uelMvps } from '../data/uelData';

export default function UELContent() {
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [activeStatsTab, setActiveStatsTab] = useState<'scorers' | 'assists'>('scorers');

  const [isMvpModalOpen, setIsMvpModalOpen] = useState(false);

  const currentStatsData = activeStatsTab === 'scorers' ? uelTopScorers : uelTopAssists;
  const topOverallScorer = uelTopScorers[0];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. 역대 우승팀 카드 (오렌지 테마) */}
        <div className="lg:col-span-5 bg-orange-600 text-white rounded-[32px] p-6 shadow-md h-[420px] flex flex-col relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] text-[150px] opacity-10 pointer-events-none">⭐</div>
          
          <div className="flex justify-between items-center mb-4 z-10">
            <h3 className="text-xl font-black tracking-wide">🏆 역대 우승팀</h3>
            <span className="text-[10px] font-bold text-orange-200 bg-orange-800 px-2 py-1 rounded-md">1997~</span>
          </div>
          
          <div className="flex flex-col gap-2 flex-1 z-10 justify-center">
            {uelWinnersHistory.slice(0, 5).map((winner, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-sm">
                <span className="font-bold text-orange-200 text-sm">{winner.year}</span>
                <span className="font-black text-sm">{winner.team}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsWinnerModalOpen(true)}
            className="w-full mt-4 py-3 bg-orange-800/60 border border-orange-700 text-white font-bold rounded-2xl hover:bg-orange-700 transition text-sm z-10"
          >
            More (전체 보기)
          </button>
        </div>

        {/* 2. 역대 득점/도움 순위 카드 */}
        <div className="lg:col-span-4 bg-white rounded-[32px] p-6 shadow-sm h-[420px] flex flex-col border-t-[10px] border-orange-600 relative">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800">UEL Top Scorer</h3>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">ALL-TIME</span>
          </div>

          <div className="flex-1 flex flex-col justify-center py-4">
            {/* 💡 text-4xl를 text-3xl로 살짝 줄이고 whitespace-nowrap을 주어 두 줄로 꺾이는 현상 방지 */}
            <h2 className="text-3xl font-black tracking-tight mb-2 text-orange-600 whitespace-nowrap">{topOverallScorer.name}</h2>
            <p className="font-bold text-gray-500">유로파리그 통산 {topOverallScorer.stat}골</p>
          </div>

          <button 
            onClick={() => setIsStatsModalOpen(true)}
            className="w-full mt-auto py-3 bg-orange-50 text-orange-600 font-bold rounded-2xl hover:bg-orange-100 transition text-sm"
          >
            More (Top 20 보기)
          </button>
        </div>

        {/* 3. 연도별 MVP 카드 */}
        <div className="lg:col-span-3 bg-white rounded-[32px] p-6 shadow-sm h-[420px] flex flex-col border-t-[10px] border-orange-600">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black text-orange-600 tracking-wide">🏅 연도별 MVP</h3>
          </div>
          
          <div className="flex flex-col gap-1.5 flex-1 justify-center">
            {uelMvps.slice(0, 5).map(mvp => (
              <div key={mvp.year} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-900">{mvp.name}</span>
                  <span className="text-[10px] font-semibold text-gray-400">{mvp.team}</span>
                </div>
                <span className="bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                  {mvp.year}
                </span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsMvpModalOpen(true)}
            className="w-full mt-auto py-3 bg-orange-50 text-orange-600 font-bold rounded-2xl hover:bg-orange-100 transition text-sm"
          >
            More (전체 보기)
          </button>
        </div>

      </div>

      {/* --- 모달 1. 역대 우승팀 (화이트 테마) --- */}
      {isWinnerModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={() => setIsWinnerModalOpen(false)}>
          <div className="bg-white text-gray-900 w-full max-w-2xl rounded-[32px] p-6 shadow-2xl max-h-[85vh] flex flex-col relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-black">🏆 역대 유로파 우승팀</h2>
              <button onClick={() => setIsWinnerModalOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1">
              {uelWinnersHistory.map((winner, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 px-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition rounded-xl cursor-default">
                  <span className="font-black text-lg text-orange-600">{winner.year}</span>
                  <span className="font-bold text-gray-800 text-lg">{winner.team}</span>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* --- 모달 2. 역대 득점/도움 순위 Top 20 (화이트 테마) --- */}
      {isStatsModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex justify-center items-center p-4" onClick={() => setIsStatsModalOpen(false)}>
          <div className="bg-white text-gray-900 w-full max-w-2xl rounded-[32px] p-6 shadow-2xl max-h-[85vh] flex flex-col relative" onClick={(e) => e.stopPropagation()}>
            
            <div className="border-b border-gray-100 pb-4 mb-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black">유로파리그 역대 순위</h2>
                <button onClick={() => setIsStatsModalOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition">✕</button>
              </div>

              <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
                <button
                  onClick={() => setActiveStatsTab('scorers')}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${activeStatsTab === 'scorers' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  득점 (Goals)
                </button>
                <button
                  onClick={() => setActiveStatsTab('assists')}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${activeStatsTab === 'assists' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  도움 (Assists)
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1">
              {currentStatsData.map((player) => (
                <div key={player.rank} className="flex items-center justify-between py-3 px-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition rounded-xl cursor-default">
                  <div className="flex items-center gap-4">
                    <span className={`w-6 text-center font-black ${player.rank <= 3 ? 'text-orange-600' : 'text-gray-400'}`}>
                      {player.rank}
                    </span>
                    <span className="font-bold text-sm text-gray-800">{player.name}</span>
                  </div>
                  <span className="font-black text-lg text-orange-600">{player.stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* --- 모달 3. 연도별 MVP (화이트 테마) --- */}
      {isMvpModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={() => setIsMvpModalOpen(false)}>
          <div className="bg-white text-gray-900 w-full max-w-2xl rounded-[32px] p-6 shadow-2xl max-h-[85vh] flex flex-col relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-black">🏅 연도별 UEL MVP</h2>
              <button onClick={() => setIsMvpModalOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1">
              {uelMvps.map((mvp, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 px-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition rounded-xl cursor-default">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-lg">{mvp.name}</span>
                    <span className="font-semibold text-gray-400 text-sm mt-1">{mvp.team}</span>
                  </div>
                  <span className="font-black text-lg text-orange-600">{mvp.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}