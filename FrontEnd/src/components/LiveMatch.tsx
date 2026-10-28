import { useEffect, useState } from 'react';
import axios from 'axios';

interface Fixture {
  id: number;
  league_id: number;
  home_team_id: number;
  away_team_id: number;
  home_score: number;
  away_score: number;
  status: string;
}

export default function LiveMatch() {
  const [liveFixture, setLiveFixture] = useState<Fixture | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('http://localhost:3000/football/fixtures')
      .then(res => {
        const fixtures = res.data;
        if (fixtures && fixtures.length > 0) {
          setLiveFixture(fixtures[0]);
        } else {
          setLiveFixture(null);
        }
      })
      .catch(err => console.error('데이터 로드 실패:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="lg:col-span-6 bg-white rounded-[32px] p-8 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[300px]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      
      {loading ? (
        <div className="flex justify-center items-center h-full z-10">
          <span className="text-gray-400 font-bold">데이터를 불러오는 중...</span>
        </div>
      ) : liveFixture ? (
        <>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-sm font-bold">LIVE</span>
            <span className="text-gray-400 font-medium">League ID: {liveFixture.league_id}</span>
          </div>
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold">{liveFixture.home_team_id}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-black mb-2 flex items-center gap-4">
                <span>{liveFixture.home_score ?? 0}</span> <span className="text-gray-300">-</span> <span>{liveFixture.away_score ?? 0}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold">{liveFixture.away_team_id}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center h-full z-10">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">⚽</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">현재 진행 중인 경기가 없습니다</h3>
          <p className="text-gray-400 text-sm">다음 경기 일정을 기다려 주세요.</p>
        </div>
      )}
    </div>
  );
}