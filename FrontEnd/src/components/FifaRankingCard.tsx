// src/components/FifaRankingCard.tsx
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { fifaRankings } from '../data/nationalData';

export default function FifaRankingCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 💡 border-blue-900 -> border-purple-900 으로 변경 */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm h-[420px] flex flex-col border-t-[10px] border-purple-900 w-full relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          {/* 💡 text-blue-900 -> text-purple-900 으로 변경 */}
          <h3 className="text-xl font-black text-purple-900 tracking-wide">🏆 최신 FIFA 랭킹</h3>
        </div>

        {/* 카드 메인 영역: Top 4만 요약해서 보여줌 */}
        <div className="flex flex-col gap-2 flex-1 justify-center">
          {fifaRankings.slice(0, 4).map((team) => (
            <div key={team.rank} className="flex items-center justify-between px-4 py-2.5 border border-gray-100 rounded-2xl bg-gray-50/50">
              <div className="flex items-center gap-4">
                {/* 💡 text-blue-600 -> text-purple-600 으로 랭킹 숫자 색상 변경 */}
                <span className="font-black text-purple-600 text-lg w-4">{team.rank}</span>
                <span className="font-black text-gray-800 text-sm">{team.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-gray-400">{team.pts} pts</span>
                <div className="w-6 h-4 overflow-hidden rounded-[2px] shadow-sm border border-gray-200">
                  <img src={`https://flagcdn.com/w20/${team.flag}.png`} alt="국기" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 💡 bg-blue-50, text-blue-900, hover:bg-blue-100 -> 보라색 테마로 완벽 변경 */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-4 py-3 bg-purple-50 text-purple-900 font-bold rounded-2xl hover:bg-purple-100 transition text-sm"
        >
          More (전체 랭킹 보기)
        </button>
      </div>

      {isModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white text-gray-900 w-full max-w-2xl rounded-[32px] p-8 shadow-2xl max-h-[85vh] flex flex-col relative" onClick={e => e.stopPropagation()}>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black tracking-tight text-gray-900">Men's FIFA Ranking</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition">✕</button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 flex-1 overflow-y-auto">
              <div className="flex text-xs font-bold text-gray-400 px-6 py-3 border-b border-gray-50">
                <div className="w-16">Rank</div>
                <div className="flex-1">Nation</div>
                <div className="w-32 text-right">Points</div>
              </div>
              
              <div className="flex flex-col">
                {fifaRankings.map((team) => (
                  <div key={team.rank} className="flex items-center px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                    {/* 💡 모달창 내부 랭킹 숫자도 text-purple-600 으로 변경 */}
                    <div className="w-16 font-black text-purple-600 text-lg">
                      {team.rank}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-6 h-4 overflow-hidden rounded-[2px] shadow-sm border border-gray-200 flex-shrink-0">
                        <img src={`https://flagcdn.com/w20/${team.flag}.png`} alt="국기" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-gray-800 text-sm whitespace-nowrap">{team.name}</span>
                    </div>
                    <div className="w-32 flex justify-end font-black text-gray-600 text-sm">
                      {team.pts}
                    </div>
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