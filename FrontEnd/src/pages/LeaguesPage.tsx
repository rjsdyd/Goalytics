// 프론트엔드 프로젝트: src/pages/LeaguesPage.tsx

import React, { useState, useEffect } from 'react';
import api from '../api/axios';

interface League {
  id: string;
  name: string;
  emblem: string;
}

interface PlayerStat {
  name: string;
  stat: number;
}

interface Team {
  id: string;
  name: string;
  logo: string;
  founded: number;
  stadium: string;
  manager: string;
  description: string;
  stadiumImage?: string; 
  topScorers?: PlayerStat[];
  topAssists?: PlayerStat[];
}

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [activeLeague, setActiveLeague] = useState('PL');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await api.get('/teams/leagues');
        const order = ['PL', 'PD', 'SA', 'BL1', 'FL1'];
        const sortedLeagues = response.data.sort((a: League, b: League) => order.indexOf(a.id) - order.indexOf(b.id));
        setLeagues(sortedLeagues);
      } catch (error) {
        console.error('리그 데이터를 불러오는데 실패했습니다.', error);
      }
    };
    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/teams/league/${activeLeague}`);
        setTeams(response.data);
      } catch (error) {
        console.error('팀 데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (activeLeague) {
      fetchTeams();
    }
  }, [activeLeague]);

  useEffect(() => {
    if (selectedTeam) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedTeam]);

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 min-h-[70vh] relative">
      
      {selectedTeam ? (
        <div className="animate-fadeIn">
          {/* 뒤로 가기 버튼 */}
          <button
            onClick={() => setSelectedTeam(null)}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-[#141b26] transition-colors font-bold"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            리그 목록으로 돌아가기
          </button>

          {/* 1. 상단: 팀 로고 및 상세 정보 */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/3 bg-gray-50 rounded-3xl flex items-center justify-center p-8 border border-gray-100">
              <img src={selectedTeam.logo} alt={selectedTeam.name} className="w-48 h-48 object-contain" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <h3 className="text-4xl font-black text-[#141b26] mb-6 tracking-tight">{selectedTeam.name}</h3>
              <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center border-b border-gray-200 pb-4">
                  <span className="w-28 text-gray-500 font-bold text-sm">창단 연도</span>
                  <span className="text-[#141b26] font-bold">{selectedTeam.founded}년</span>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-4">
                  <span className="w-28 text-gray-500 font-bold text-sm">홈 구장</span>
                  <span className="text-[#141b26] font-bold">{selectedTeam.stadium}</span>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-4">
                  <span className="w-28 text-gray-500 font-bold text-sm">감독</span>
                  <span className="text-[#141b26] font-bold">{selectedTeam.manager}</span>
                </div>
                <div className="flex items-start pt-2">
                  <span className="w-28 text-gray-500 font-bold text-sm shrink-0 mt-0.5">팀 설명</span>
                  <span className="text-gray-700 leading-relaxed text-sm font-medium">{selectedTeam.description}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 중단: 역대 득점 및 도움 순위 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* 역대 득점 순위 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h4 className="text-2xl font-black text-[#141b26] mb-6 flex items-center gap-3 tracking-tight">
                <span className="w-2.5 h-8 bg-[#41e307] rounded-full shadow-sm"></span>
                역대 득점 순위
              </h4>
              <div className="space-y-3">
                {selectedTeam.topScorers && selectedTeam.topScorers.length > 0 ? (
                  selectedTeam.topScorers.map((player, index) => (
                    <div key={`scorer-${index}`} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-[#41e307] transition-colors">
                      <div className="flex items-center gap-5">
                        <span className="font-black text-gray-300 text-lg w-4">{index + 1}</span>
                        <span className="font-bold text-[#141b26]">{player.name}</span>
                      </div>
                      <span className="text-[#41e307] font-black tracking-wide">{player.stat} 골</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400 font-semibold">데이터를 준비 중입니다.</div>
                )}
              </div>
            </div>

            {/* 역대 도움 순위 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h4 className="text-2xl font-black text-[#141b26] mb-6 flex items-center gap-3 tracking-tight">
                <span className="w-2.5 h-8 bg-[#41e307] rounded-full shadow-sm"></span>
                역대 도움 순위
              </h4>
              <div className="space-y-3">
                {selectedTeam.topAssists && selectedTeam.topAssists.length > 0 ? (
                  selectedTeam.topAssists.map((player, index) => (
                    <div key={`assist-${index}`} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-[#41e307] transition-colors">
                      <div className="flex items-center gap-5">
                        <span className="font-black text-gray-300 text-lg w-4">{index + 1}</span>
                        <span className="font-bold text-[#141b26]">{player.name}</span>
                      </div>
                      <span className="text-[#41e307] font-black tracking-wide">{player.stat} 도움</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400 font-semibold">데이터를 준비 중입니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 기본 리그 및 팀 목록 화면 */
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">리그 및 팀 소개</h2>
          </div>

          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {leagues.map((league) => (
              <button
                key={league.id}
                onClick={() => setActiveLeague(league.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                  activeLeague === league.id
                    ? 'bg-[#41e307] text-[#141b26] shadow-md'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <img src={league.emblem} alt={league.name} className="w-6 h-6 object-contain" />
                {league.name}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#41e307]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className="group aspect-square flex flex-col items-center justify-center bg-gray-50 border-2 border-transparent rounded-2xl hover:bg-white hover:border-[#41e307] hover:shadow-lg transition-all duration-300 p-4"
                >
                  <img 
                    src={team.logo} 
                    alt={`${team.name} 로고`} 
                    className="w-16 h-16 object-contain mb-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="font-bold text-[#141b26] text-center text-sm">{team.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}