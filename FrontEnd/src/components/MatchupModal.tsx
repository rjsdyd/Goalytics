import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axios';
import { NATIONAL_TEAMS } from '../data/nationsData';

interface TeamBasic {
  id: string;
  name: string;
  logo: string;
}

interface MatchupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MatchupModal({ isOpen, onClose }: MatchupModalProps) {
  const [category, setCategory] = useState<'league' | 'nation'>('league');
  const [teamA, setTeamA] = useState<TeamBasic | null>(null);
  const [teamB, setTeamB] = useState<TeamBasic | null>(null);
  
  const [selectingTarget, setSelectingTarget] = useState<'A' | 'B' | null>(null);
  const [availableTeams, setAvailableTeams] = useState<TeamBasic[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);

  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTeamA(null);
      setTeamB(null);
      setAiResult(null);
      setSelectingTarget(null);
      setAvailableTeams([]);
    }
  }, [isOpen, category]);

  const fetchTeamsForSelection = async () => {
    setIsLoadingTeams(true);
    try {
      if (category === 'league') {
        const order = ['PL', 'PD', 'SA', 'BL1', 'FL1'];
        let allClubs: TeamBasic[] = [];
        for (const leagueId of order) {
          const res = await api.get(`/teams/league/${leagueId}`);
          allClubs = [...allClubs, ...res.data];
        }
        setAvailableTeams(allClubs);
      } else {
        const nations = NATIONAL_TEAMS.map(n => ({
          id: n.id,
          name: n.name,
          logo: `https://flagcdn.com/w160/${n.id}.png`
        }));
        setAvailableTeams(nations);
      }
    } catch (error) {
      console.error('팀 목록을 불러오는데 실패했습니다.', error);
    } finally {
      setIsLoadingTeams(false);
    }
  };

  const handleSelectClick = (target: 'A' | 'B') => {
    setSelectingTarget(target);
    if (availableTeams.length === 0) {
      fetchTeamsForSelection(); 
    }
  };

  const handleTeamSelect = (team: TeamBasic) => {
    if (selectingTarget === 'A') {
      if (teamB?.name === team.name) return alert('이미 상대 팀으로 선택되었습니다.');
      setTeamA(team);
    } else {
      if (teamA?.name === team.name) return alert('이미 상대 팀으로 선택되었습니다.');
      setTeamB(team);
    }
    setSelectingTarget(null);
    setAiResult(null);
  };

  const runSimulation = async () => {
    if (!teamA || !teamB) return alert('두 팀을 모두 선택해주세요!');
    
    setIsSimulating(true);
    setAiResult(null);
    try {
      const res = await axios.get(`http://localhost:3000/matchup?teamA=${encodeURIComponent(teamA.name)}&teamB=${encodeURIComponent(teamB.name)}&category=${category}`);
      setAiResult(res.data.result);
    } catch (error) {
      setAiResult('시뮬레이션 중 오류가 발생했습니다.');
    } finally {
      setIsSimulating(false);
    }
  };

  const renderAdvancedAiBriefing = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-4 text-left mt-6">
        {lines.map((line, idx) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return null;

          if (/^#+\s/.test(trimmedLine)) {
            const headingText = trimmedLine.replace(/^#+\s*/, '').replace(/\*\*/g, '');
            return (
              <h4 key={idx} className="text-xl font-black text-[#141b26] mt-6 mb-2 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
                <span className="w-1.5 h-6 bg-[#41e307] rounded-full"></span>
                {headingText}
              </h4>
            );
          }

          if (/^(\d+\.|[\*\-])\s/.test(trimmedLine)) {
            const listContent = trimmedLine.replace(/^(\d+\.|[\*\-])\s*/, '');
            const boldParsed = listContent.split(/(\*\*.*?\*\*)/g).map((part, i) => 
              part.startsWith('**') ? <strong key={i} className="text-[#141b26] font-extrabold bg-gray-100 px-1.5 rounded">{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
            );
            return (
              <div key={idx} className="flex gap-3 items-start bg-white p-3 rounded-2xl border border-gray-100 ml-1">
                <span className="flex-shrink-0 text-[#41e307] font-bold text-lg mt-0.5">⚡</span>
                <p className="text-gray-700 leading-relaxed font-medium">{boldParsed}</p>
              </div>
            );
          }

          const boldParsed = trimmedLine.split(/(\*\*.*?\*\*)/g).map((part, i) => 
            part.startsWith('**') ? <strong key={i} className="text-[#141b26] font-extrabold">{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
          );

          return <p key={idx} className="text-gray-600 leading-relaxed font-medium px-2">{boldParsed}</p>;
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl flex flex-col relative overflow-hidden">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors z-10">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="bg-[#141b26] p-8 text-center shrink-0">
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-3">
            <span className="text-4xl">⚔️</span> 가상 매치업 시뮬레이터
          </h2>
          <p className="text-gray-400 mt-2 font-medium">AI가 분석하는 꿈의 맞대결 결과를 확인하세요.</p>
        </div>

        <div className="p-8 overflow-y-auto flex-1 bg-gray-50">
          
          <div className="flex justify-center mb-10">
            <div className="bg-white p-1.5 rounded-full flex shadow-sm border border-gray-100">
              <button 
                onClick={() => setCategory('league')} 
                className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${category === 'league' ? 'bg-[#41e307] text-[#141b26] shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                클럽 매치업
              </button>
              <button 
                onClick={() => setCategory('nation')} 
                className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${category === 'nation' ? 'bg-[#41e307] text-[#141b26] shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                국가대표 매치업
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            
            <button onClick={() => handleSelectClick('A')} className="w-full md:w-1/3 aspect-square bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-[#41e307] flex flex-col items-center justify-center p-6 transition-all hover:shadow-md group">
              {teamA ? (
                <>
                  <img src={teamA.logo} alt={teamA.name} className="w-24 h-24 object-contain mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-black text-lg text-[#141b26] text-center">{teamA.name}</span>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:bg-[#41e307]/10">➕</div>
                  <span className="font-bold text-gray-400">팀 A 선택</span>
                </>
              )}
            </button>

            <div className="shrink-0 flex flex-col items-center">
              <div className="w-14 h-14 bg-[#141b26] rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
                <span className="text-[#41e307] font-black italic text-xl">VS</span>
              </div>
            </div>

            <button onClick={() => handleSelectClick('B')} className="w-full md:w-1/3 aspect-square bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-[#41e307] flex flex-col items-center justify-center p-6 transition-all hover:shadow-md group">
              {teamB ? (
                <>
                  <img src={teamB.logo} alt={teamB.name} className="w-24 h-24 object-contain mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-black text-lg text-[#141b26] text-center">{teamB.name}</span>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:bg-[#41e307]/10">➕</div>
                  <span className="font-bold text-gray-400">팀 B 선택</span>
                </>
              )}
            </button>

          </div>

          <div className="flex justify-center mb-10">
            <button 
              onClick={runSimulation}
              disabled={isSimulating || !teamA || !teamB}
              className={`px-10 py-4 rounded-full font-black text-lg tracking-wide transition-all shadow-lg flex items-center gap-3 ${
                (!teamA || !teamB) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : isSimulating ? 'bg-[#141b26] text-[#41e307] animate-pulse cursor-wait'
                : 'bg-[#41e307] text-[#141b26] hover:scale-105 hover:bg-[#38c906]'
              }`}
            >
              {isSimulating ? 'AI 분석 중...' : '시뮬레이션 시작'}
            </button>
          </div>

          {aiResult && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm fade-in">
              <h3 className="text-center font-black text-2xl text-[#141b26] mb-4">🏆 시뮬레이션 리포트</h3>
              {renderAdvancedAiBriefing(aiResult)}
            </div>
          )}

        </div>

        {selectingTarget && (
          <div className="absolute inset-0 bg-white z-20 flex flex-col fade-in">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
              <h3 className="text-xl font-black text-[#141b26]">
                {category === 'league' ? '클럽' : '국가대표'} 팀 선택 (팀 {selectingTarget})
              </h3>
              <button onClick={() => setSelectingTarget(null)} className="text-gray-400 hover:text-gray-900 font-bold">닫기 ✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {isLoadingTeams ? (
                <div className="flex justify-center py-20"><div className="animate-spin h-10 w-10 border-4 border-[#141b26] border-t-[#41e307] rounded-full"></div></div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {availableTeams.map(team => (
                    <button 
                      key={team.id}
                      onClick={() => handleTeamSelect(team)}
                      className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-[#41e307] hover:bg-white transition-all group"
                    >
                      <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain mb-3 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-sm text-[#141b26] text-center line-clamp-2">{team.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}