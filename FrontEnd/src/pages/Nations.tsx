// src/pages/Nations.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONFEDERATIONS, NATIONAL_TEAMS } from '../data/nationsData';

interface ApiNation {
  id: string;
  name: string;
  confederation: string;
}

export default function Nations() {
  const [currentConfed, setCurrentConfed] = useState(() => {
    return sessionStorage.getItem('goalytics_current_confed') || 'UEFA';
  });
  
  const [teams, setTeams] = useState<ApiNation[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('goalytics_current_confed', currentConfed);
  }, [currentConfed]);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/football/nations?confederation=${currentConfed}`)
      .then(res => {
        setTeams(res.data);
      })
      .catch(() => {
        const fallbackData = NATIONAL_TEAMS.filter(t => t.confederation === currentConfed);
        setTeams(fallbackData);
      })
      .finally(() => setLoading(false));
  }, [currentConfed]);

  // 💡 데이터 로딩이 끝나면 저장된 스크롤 위치로 이동
  useEffect(() => {
    if (!loading) {
      const savedScroll = sessionStorage.getItem('goalytics_nations_scroll');
      if (savedScroll) {
        setTimeout(() => window.scrollTo(0, parseInt(savedScroll, 10)), 10);
      }
    }
  }, [loading]);

  // 💡 대륙 탭 클릭 시 스크롤 상단 초기화
  const handleTabClick = (confedId: string) => {
    setCurrentConfed(confedId);
    sessionStorage.setItem('goalytics_nations_scroll', '0');
  };

  // 💡 국가 클릭 시 현재 스크롤 위치 저장 후 이동
  const handleNationClick = (teamId: string) => {
    sessionStorage.setItem('goalytics_nations_scroll', window.scrollY.toString());
    navigate(`/nations/${teamId}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full fade-in">
      <div className="bg-white rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">🌍 국가대표 (National Teams)</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CONFEDERATIONS.map(confed => (
            <button
              key={confed.id}
              onClick={() => handleTabClick(confed.id)}
              className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all shadow-sm ${
                currentConfed === confed.id 
                  ? 'bg-purple-900 text-white transform scale-[1.02]' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {confed.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? (
          <div className="col-span-full bg-white rounded-3xl p-10 text-center text-gray-400 font-bold">국가 데이터를 불러오는 중...</div>
        ) : teams.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-10 text-center text-gray-400 font-bold">국가 데이터가 없습니다.</div>
        ) : (
          teams.map((team) => (
            <button
              key={team.id}
              onClick={() => handleNationClick(team.id)}
              className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all border border-gray-50 group"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm border-4 border-gray-50 group-hover:border-purple-100 transition-colors bg-gray-100">
                <img 
                  src={`https://flagcdn.com/w160/${team.id}.png`} 
                  alt={`${team.name} 국기`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <span className="font-black text-lg text-gray-800">{team.name}</span>
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">{team.confederation}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}