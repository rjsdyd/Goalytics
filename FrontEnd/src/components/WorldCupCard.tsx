import { useState } from 'react';
import { createPortal } from 'react-dom';
import { worldCupWinners } from '../data/nationalData';

export default function WorldCupCard() {
  const [isWcModalOpen, setIsWcModalOpen] = useState(false);

  return (
    <>
      <div className="bg-purple-900 text-white rounded-[32px] p-6 shadow-md h-[420px] flex flex-col relative overflow-hidden w-full">
        <div className="absolute top-[-10%] right-[-5%] text-[150px] opacity-10 pointer-events-none">🌍</div>
        
        <div className="flex justify-between items-center mb-4 z-10">
          <h3 className="text-xl font-black tracking-wide">🏆 역대 월드컵 우승팀</h3>
          <span className="text-[10px] font-bold text-purple-200 bg-purple-800 px-2 py-1 rounded-md">1930~</span>
        </div>
        
        <div className="flex flex-col gap-2 flex-1 z-10 justify-center">
          {worldCupWinners.slice(0, 5).map((wc, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="font-black text-purple-200 text-sm w-10">{wc.year}</span>
                <span className="text-xs text-purple-100/70 hidden sm:inline-block">({wc.host})</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={`https://flagcdn.com/w20/${wc.flag}.png`} alt="국기" className="w-5 h-3.5 object-cover rounded-[2px]" />
                <span className="font-black text-sm">{wc.winner}</span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setIsWcModalOpen(true)}
          className="w-full mt-4 py-3 bg-purple-800/60 border border-purple-700 text-white font-bold rounded-2xl hover:bg-purple-700 transition text-sm z-10"
        >
          More (전체 보기)
        </button>
      </div>

      {isWcModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={() => setIsWcModalOpen(false)}>
          <div className="bg-white text-gray-900 w-full max-w-2xl rounded-[32px] p-6 shadow-2xl max-h-[85vh] flex flex-col relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-purple-900">🌍 역대 FIFA 월드컵 우승국</h2>
                <p className="text-sm font-bold text-gray-400 mt-1">1930년 초대 대회부터 현재까지</p>
              </div>
              <button onClick={() => setIsWcModalOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1">
              {worldCupWinners.map((wc, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 px-4 border-b border-gray-50 last:border-0 hover:bg-purple-50/50 transition rounded-xl cursor-default group">
                  <div className="flex items-center gap-4">
                    <span className="font-black text-lg text-purple-600 w-12">{wc.year}</span>
                    <span className="font-bold text-sm text-gray-400 group-hover:text-purple-400 transition">{wc.host} 개최</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-gray-800 text-lg">{wc.winner}</span>
                    <div className="w-8 h-6 overflow-hidden rounded-md shadow-sm border border-gray-100">
                      <img src={`https://flagcdn.com/w40/${wc.flag}.png`} alt={`${wc.winner} 국기`} className="w-full h-full object-cover" />
                    </div>
                  </div>
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