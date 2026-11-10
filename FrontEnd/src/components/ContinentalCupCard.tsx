import { useState } from 'react';
import { createPortal } from 'react-dom';
import { continentalCups } from '../data/nationalData';

type CupType = 'asianCup' | 'euro' | 'copaAmerica' | 'afcon';

export default function ContinentalCupCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<CupType>('asianCup');

  const tabs: { id: CupType; label: string }[] = [
    { id: 'asianCup', label: '아시안컵' },
    { id: 'euro', label: 'UEFA 유로' },
    { id: 'copaAmerica', label: '코파 아메리카' },
    { id: 'afcon', label: '네이션스컵 (CAF)' },
  ];

  const currentData = continentalCups[activeTab];

  const recentWinners = [
    { name: 'AFC 아시안컵', data: continentalCups.asianCup[0] },
    { name: 'UEFA 유로', data: continentalCups.euro[0] },
    { name: '코파 아메리카', data: continentalCups.copaAmerica[0] },
    { name: '아프리카 네이션스컵', data: continentalCups.afcon[0] },
  ];

  return (
    <>
      <div className="bg-white rounded-[32px] p-6 shadow-sm h-[420px] flex flex-col border-t-[10px] border-purple-900 w-full relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-purple-900 tracking-wide">🏆 대륙별 최신 우승팀</h3>
        </div>

        <div className="flex flex-col gap-2 flex-1 justify-center">
          {recentWinners.map((cup, idx) => (
            <div key={idx} className="flex items-center justify-between px-4 py-2.5 border border-gray-100 rounded-2xl bg-gray-50/50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 mb-0.5">{cup.name}</span>
                <span className="font-black text-purple-900 text-sm">{cup.data.year} {cup.data.host}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800 text-sm">{cup.data.winner}</span>
                <div className="w-6 h-4 overflow-hidden rounded-[2px] shadow-sm border border-gray-200">
                  <img src={`https://flagcdn.com/w20/${cup.data.flag}.png`} alt="국기" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-4 py-3 bg-purple-50 text-purple-900 font-bold rounded-2xl hover:bg-purple-100 transition text-sm"
        >
          More (역대 우승국 보기)
        </button>
      </div>

      {isModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white text-gray-900 w-full max-w-3xl rounded-[32px] p-8 shadow-2xl max-h-[85vh] flex flex-col relative" onClick={e => e.stopPropagation()}>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black tracking-tight text-gray-900">Continental Cups History</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition">✕</button>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 flex-1 overflow-y-auto">
              <div className="flex text-xs font-bold text-gray-400 px-6 py-3 border-b border-gray-50">
                <div className="w-20">Year</div>
                <div className="flex-1">Host</div>
                <div className="w-48 text-right">Winner</div>
              </div>
              
              <div className="flex flex-col">
                {currentData.map((item, idx) => (
                  <div key={idx} className="flex items-center px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                    <div className="w-20 font-black text-purple-600 text-lg">
                      {item.year}
                    </div>
                    <div className="flex-1 font-bold text-gray-500 text-sm">
                      {item.host}
                    </div>
                    <div className="w-48 flex items-center justify-end gap-3">
                      <span className="font-black text-gray-800 text-base whitespace-nowrap">{item.winner}</span>
                      <div className="w-6 h-4 overflow-hidden rounded-[2px] shadow-sm border border-gray-200 flex-shrink-0">
                        <img src={`https://flagcdn.com/w20/${item.flag}.png`} alt="국기" className="w-full h-full object-cover" />
                      </div>
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