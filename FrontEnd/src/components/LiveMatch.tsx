// src/components/LiveMatch.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Match {
  id: number;
  league: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  score: string;
  status: 'LIVE' | 'FT' | 'SCHEDULED';
  time: string;
}

export default function LiveMatch() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const today = new Date().toLocaleDateString('en-CA'); 

    axios.get(`http://localhost:3000/football/fixtures?date=${today}`)
      .then(res => {
        setMatches(res.data || []);
      })
      .catch(err => {
        console.error("실시간 경기 데이터 로드 실패:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="lg:col-span-6 bg-white rounded-[32px] p-6 shadow-sm h-[420px] flex flex-col relative overflow-hidden border-t-[10px] border-green-500">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-gray-800 tracking-tight">리그 별 경기 일정</h3>
        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
          Live & Results
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 scrollbar-hide">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 opacity-50">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-sm text-gray-400">실시간 경기 데이터를 불러오는 중...</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 opacity-50">
            <span className="text-4xl mb-2">⚽</span>
            <p className="font-bold text-sm text-gray-400">오늘 예정된 주요 리그 경기가 없습니다.</p>
          </div>
        ) : (
          matches.map(match => (
            <div key={match.id} className="flex flex-col p-4 border border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition cursor-default">
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-gray-400 line-clamp-1 max-w-[120px]">{match.league}</span>
                {match.status === 'LIVE' ? (
                  <span className="text-[10px] font-black text-red-500 animate-pulse bg-red-50 px-2 py-0.5 rounded-full whitespace-nowrap">{match.time} (LIVE)</span>
                ) : match.status === 'SCHEDULED' ? (
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full whitespace-nowrap">{match.time}</span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full whitespace-nowrap">종료</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-2 w-[35%]">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="max-h-full max-w-full object-contain drop-shadow-sm" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 text-center line-clamp-1">{match.homeTeam.name}</span>
                </div>

                <div className="flex-1 flex justify-center items-center">
                  <span className={`text-2xl font-black tracking-tighter ${match.status === 'LIVE' ? 'text-red-500' : 'text-gray-900'}`}>
                    {match.score}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 w-[35%]">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="max-h-full max-w-full object-contain drop-shadow-sm" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 text-center line-clamp-1">{match.awayTeam.name}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}