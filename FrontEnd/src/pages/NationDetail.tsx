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

  const [aiBriefing, setAiBriefing] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

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
      const token = localStorage.getItem('access_token');
      if (token) {
        axios.get('http://localhost:3000/mypage/favorites/nations', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => {
            const favoriteNations = res.data;
            setIsFavorite(favoriteNations.some((t: any) => t.nation_id === team.id));
          })
          .catch(console.error);
      }
      
      fetchAiBriefing(team.name);
    }
  }, [team]);

  const fetchAiBriefing = async (teamName: string) => {
    setAiLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/ai/tactics?team=${encodeURIComponent(teamName)}`);
      setAiBriefing(res.data.briefing);
    } catch (error) {
      console.error('AI 분석 실패:', error);
      setAiBriefing('AI 전술 분석을 불러오는 중 문제가 발생했습니다.');
    } finally {
      setAiLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!team) return;
    
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/mypage/favorites/nations', {
        nation_id: team.id,
        nation_name: team.name,
        logo_url: `https://flagcdn.com/w160/${team.id}.png`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsFavorite(response.data.status);
    } catch (error) {
      console.error('즐겨찾기 요청에 실패했습니다.', error);
    }
  };

  const renderAdvancedAiBriefing = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-5">
        {lines.map((line, idx) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return null;

          if (/^#+\s/.test(trimmedLine)) {
            const headingText = trimmedLine.replace(/^#+\s*/, '').replace(/\*\*/g, '');
            return (
              <h4 key={idx} className="text-xl font-black text-purple-900 mt-6 mb-3 flex items-center gap-2 border-b-2 border-purple-50 pb-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
                {headingText}
              </h4>
            );
          }

          if (/^(\d+\.|[\*\-])\s/.test(trimmedLine)) {
            const listContent = trimmedLine.replace(/^(\d+\.|[\*\-])\s*/, '');
            const boldParsed = listContent.split(/(\*\*.*?\*\*)/g).map((part, i) => 
              part.startsWith('**') ? <strong key={i} className="text-purple-900 font-extrabold bg-purple-100 px-1.5 rounded">{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
            );
            return (
              <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-2xl border border-purple-100 shadow-sm ml-2 hover:border-purple-300 transition-colors">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm mt-0.5">
                  ✓
                </span>
                <p className="text-gray-700 leading-relaxed font-medium">{boldParsed}</p>
              </div>
            );
          }

          const boldParsed = trimmedLine.split(/(\*\*.*?\*\*)/g).map((part, i) => 
            part.startsWith('**') ? <strong key={i} className="text-purple-900 font-extrabold">{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
          );

          return (
            <p key={idx} className="text-gray-600 leading-relaxed font-medium px-2">
              {boldParsed}
            </p>
          );
        })}
      </div>
    );
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
          
          <div className="flex items-center gap-8 z-10 w-full pr-4">
            <img src={`https://flagcdn.com/w160/${team.id}.png`} alt="국기" className="w-32 h-32 rounded-full border-4 border-white/20 shadow-lg object-cover bg-gray-100" />
            <div className="flex flex-col text-white flex-1">
              <span className="text-purple-200 font-bold text-md tracking-widest uppercase mb-1">{team.confederation}</span>
              
              <div className="flex items-center justify-between w-full">
                <h2 className="text-5xl font-black tracking-tight">{team.name}</h2>
                <button 
                  onClick={toggleFavorite}
                  className={`text-4xl transition-all hover:scale-110 drop-shadow-sm pb-1 cursor-pointer ${!isFavorite ? 'grayscale opacity-40 hover:opacity-80' : ''}`}
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

          <div className="mt-8 border-t-2 border-dashed border-purple-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-purple-900 flex items-center gap-3 tracking-tight">
                <span className="text-3xl animate-bounce">🤖</span> Goalytics AI 전술 리포트
              </h3>
              {aiLoading && <span className="text-sm font-bold text-purple-700 animate-pulse bg-purple-100 px-3 py-1 rounded-full">분석 중...</span>}
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl shadow-sm p-8 border border-purple-100 relative overflow-hidden">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-5">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600"></div>
                  <span className="text-purple-700 font-bold animate-pulse text-lg">Goalytics AI가 {team.name}의 전술을 분석 중입니다...</span>
                </div>
              ) : (
                <div className="w-full">
                  {aiBriefing ? renderAdvancedAiBriefing(aiBriefing) : (
                    <div className="text-center py-10 text-gray-400 font-bold">분석 결과를 불러올 수 없습니다.</div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}