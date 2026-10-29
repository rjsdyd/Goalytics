// 프론트엔드 프로젝트: src/pages/LeaguesPage.tsx

import React, { useState, useEffect } from 'react';
import api from '../api/axios';

interface League {
  id: string;
  name: string;
  emblem: string; // 백엔드에서 받아올 리그 로고 이미지
}

interface Team {
  id: string;
  name: string;
  logo: string;
  founded: number;
  stadium: string;
  manager: string;
  description: string;
}

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<League[]>([]); // ✅ 동적 리그 상태 추가
  const [activeLeague, setActiveLeague] = useState('PL');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. 처음 화면이 켜질 때 백엔드에서 '리그 목록'을 가져옵니다.
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await api.get('/teams/leagues');
        // 원하는 순서대로 정렬 (PL, La Liga, Serie A, Bundesliga, Ligue 1)
        const order = ['PL', 'PD', 'SA', 'BL1', 'FL1'];
        const sortedLeagues = response.data.sort((a: League, b: League) => order.indexOf(a.id) - order.indexOf(b.id));
        setLeagues(sortedLeagues);
      } catch (error) {
        console.error('리그 데이터를 불러오는데 실패했습니다.', error);
      }
    };
    fetchLeagues();
  }, []);

  // 2. 활성화된 리그가 바뀔 때마다 백엔드에서 '팀 목록'을 가져옵니다.
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

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 min-h-[70vh] relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">리그 및 팀 소개</h2>
      </div>

      {/* 1. 동적 리그 선택 탭 (API 연동 완료) */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => {
              setActiveLeague(league.id);
              setSelectedTeam(null);
            }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
              activeLeague === league.id
                ? 'bg-[#141b26] text-white shadow-md'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {/* ✅ 하드코딩된 이모지 대신 고화질 리그 로고 출력 */}
            <img src={league.emblem} alt={league.name} className="w-6 h-6 object-contain" />
            {league.name}
          </button>
        ))}
      </div>

      {/* 2. 로딩 스피너 및 팀 정사각형 버튼 그리드 */}
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

      {/* 3. 팀 상세 정보 모달 (팝업) */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl relative animate-fadeIn">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedTeam(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 모달 내용 */}
            <div className="flex flex-col items-center text-center">
              <img 
                src={selectedTeam.logo} 
                alt={selectedTeam.name} 
                className="w-28 h-28 object-contain mb-4"
              />
              <h3 className="text-3xl font-black text-[#141b26] mb-2 tracking-tight">{selectedTeam.name}</h3>
              <p className="text-gray-500 mb-6 font-medium text-sm leading-relaxed">
                {selectedTeam.description}
              </p>
              
              <div className="w-full bg-gray-50 rounded-2xl p-5 space-y-3 text-left">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-500 font-semibold text-sm">창단 연도</span>
                  <span className="font-bold text-[#141b26]">{selectedTeam.founded}년</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-500 font-semibold text-sm">홈 구장</span>
                  <span className="font-bold text-[#141b26] text-right">{selectedTeam.stadium}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500 font-semibold text-sm">감독</span>
                  <span className="font-bold text-[#141b26]">{selectedTeam.manager}</span>
                </div>
              </div>
              
              <button 
                className="w-full mt-6 py-3.5 bg-[#141b26] text-[#41e307] font-bold rounded-xl hover:bg-gray-800 transition-colors"
                onClick={() => setSelectedTeam(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}