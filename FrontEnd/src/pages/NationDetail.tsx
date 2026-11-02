// src/pages/NationDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NATIONAL_TEAMS, type NationalTeam } from '../data/nationsData';

export default function NationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<NationalTeam | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/football/nations/${id}`)
      .then(res => {
        const apiData = res.data;
        const manualData = NATIONAL_TEAMS.find(t => t.id === id);
        
        setTeam({
          id: apiData.id || id,
          name: apiData.name,
          confederation: apiData.confederation,
          manager: apiData.manager,
          captain: apiData.captain,
          description: apiData.description,
          topScorers: manualData?.topScorers || [],
          topAssists: manualData?.topAssists || [],
          honors: manualData?.honors || []
        });
      })
      .catch(() => {
        const foundTeam = NATIONAL_TEAMS.find(t => t.id === id) || null;
        setTeam(foundTeam);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (team) {
      axios.get('http://localhost:3000/mypage/favorites/nations')
        .then((res) => {
          const favoriteNations = res.data;
          setIsFavorite(favoriteNations.some((t: any) => t.nation_id === team.id));
        })
        .catch(console.error);
    }
  }, [team]);

  const toggleFavorite = async () => {
    if (!team) return;
    
    try {
      const response = await axios.post('http://localhost:3000/mypage/favorites/nations', {
        nation_id: team.id,
        nation_name: team.name,
        logo_url: `https://flagcdn.com/w160/${team.id}.png`
      });
      setIsFavorite(response.data.status);
    } catch (error) {
      console.error('즐겨찾기 요청에 실패했습니다.', error);
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-400">데이터 로딩 중...</div>;
  if (!team) return <div className="p-10 text-center font-bold text-gray-400">국가 데이터를 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col gap-6 w-full fade-in pb-10">
      
      <button 
        onClick={() => navigate('/nations')} 
        className="self-start px-5 py-2.5 bg-white text-gray-600 hover:text-gray-900 font-bold rounded-2xl shadow-sm transition hover:shadow-md"
      >
        ← 목록으로 돌아가기
      </button>

      <div className="bg-white w-full rounded-[32px] overflow-hidden shadow-sm flex flex-col">
        <div className="bg-gradient-to-r from-purple-900 to-purple-800 p-10 flex items-start relative overflow-hidden">
          <div className="absolute right-[-5%] top-[-50%] opacity-10 w-96 h-96 transform rotate-12 pointer-events-none">
            <img src={`https://flagcdn.com/w320/${team.id}.png`} alt="배경 국기" className="w-full h-full object-cover blur-md" />
          </div>
          
          {/* 💡 헤더 영역을 꽉 채우고(flex-1), 버튼을 우측 끝으로 밀어냄 */}
          <div className="flex items-center gap-8 z-10 w-full pr-4">
            <img src={`https://flagcdn.com/w160/${team.id}.png`} alt="국기" className="w-32 h-32 rounded-full border-4 border-white/20 shadow-lg object-cover bg-gray-100" />
            <div className="flex flex-col text-white flex-1">
              <span className="text-purple-200 font-bold text-md tracking-widest uppercase mb-1">{team.confederation}</span>
              
              <div className="flex items-center justify-between w-full">
                <h2 className="text-5xl font-black tracking-tight">{team.name}</h2>
                <button 
                  onClick={toggleFavorite}
                  className={`text-4xl transition-all hover:scale-110 drop-shadow-sm pb-1 ${!isFavorite ? 'grayscale opacity-40' : ''}`}
                  title="즐겨찾기 추가/해제"
                >
                  ⭐
                </button>
              </div>
              
            </div>
          </div>
        </div>

        <div className="p-10 flex flex-col gap-10 bg-gray-50/50">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-5 border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">👔</div>
              <div>
                <span className="text-sm text-gray-400 font-bold block mb-1">감독 (Manager)</span>
                <span className="font-black text-gray-800 text-xl">{team.manager}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-5 border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">©️</div>
              <div>
                <span className="text-sm text-gray-400 font-bold block mb-1">주장 (Captain)</span>
                <span className="font-black text-gray-800 text-xl">{team.captain}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-purple-900 mb-4">📌 팀 소개</h3>
            <p className="bg-white p-6 rounded-3xl shadow-sm text-gray-600 font-medium leading-relaxed border border-gray-100">
              {team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-black text-purple-900 mb-4">⚽ 역대 득점 Top 3</h3>
              <div className="bg-white rounded-3xl shadow-sm p-4 border border-gray-100">
                {team.topScorers.length === 0 ? (
                  <div className="py-4 text-center text-gray-400 font-bold">기록이 없습니다.</div>
                ) : (
                  team.topScorers.map(p => (
                    <div key={p.rank} className="flex justify-between items-center py-4 px-4 border-b border-gray-50 last:border-0">
                      <div className="flex gap-4 items-center">
                        <span className="text-purple-600 font-black text-lg">{p.rank}</span>
                        <span className="font-bold text-gray-800">{p.name}</span>
                      </div>
                      <span className="font-black text-gray-900 text-lg">{p.stat}골</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-purple-900 mb-4">🎯 역대 도움 Top 3</h3>
              <div className="bg-white rounded-3xl shadow-sm p-4 border border-gray-100">
                {team.topAssists.length === 0 ? (
                  <div className="py-4 text-center text-gray-400 font-bold">기록이 없습니다.</div>
                ) : (
                  team.topAssists.map(p => (
                    <div key={p.rank} className="flex justify-between items-center py-4 px-4 border-b border-gray-50 last:border-0">
                      <div className="flex gap-4 items-center">
                        <span className="text-purple-600 font-black text-lg">{p.rank}</span>
                        <span className="font-bold text-gray-800">{p.name}</span>
                      </div>
                      <span className="font-black text-gray-900 text-lg">{p.stat}도움</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-purple-900 mb-4">🏆 주요 우승 경력</h3>
            <div className="bg-white rounded-3xl shadow-sm p-4 border border-gray-100">
              {team.honors.length === 0 ? (
                <div className="py-4 text-center text-gray-400 font-bold">우승 기록이 없습니다.</div>
              ) : (
                team.honors.map((honor, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-4 px-4 border-b border-gray-50 last:border-0">
                    <span className="text-yellow-500 text-2xl">⭐</span>
                    <span className="font-bold text-gray-800 text-lg">{honor}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}