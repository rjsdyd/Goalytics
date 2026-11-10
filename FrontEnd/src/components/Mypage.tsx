import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ModeContext } from '../App';

export default function MyPage() {
  const { setActiveMode } = useContext(ModeContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [favoriteTeams, setFavoriteTeams] = useState<any[]>([]);
  const [favoriteNations, setFavoriteNations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState('[팀 추가 요청]');
  const [inquiryContent, setInquiryContent] = useState('');

  const teamAccentBg = 'bg-[#41e307]';
  const teamHoverBorder = 'hover:border-[#41e307]';
  const nationAccentBg = 'bg-purple-500';
  const nationHoverBorder = 'hover:border-purple-500';

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [profileRes, teamsRes, nationsRes] = await Promise.all([
          axios.get('http://localhost:3000/mypage/profile', { headers }),
          axios.get('http://localhost:3000/mypage/favorites/teams', { headers }),
          axios.get('http://localhost:3000/mypage/favorites/nations', { headers })
        ]);
        
        const localNickname = localStorage.getItem('nickname');
        const profileData = {
          ...profileRes.data,
          nickname: profileRes.data?.nickname || localNickname || '사용자'
        };

        setProfile(profileData);
        setFavoriteTeams(teamsRes.data);
        setFavoriteNations(nationsRes.data);
      } catch (error) {
        console.error('마이페이지 데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyPageData();
  }, []);

  const handleWithdraw = async () => {
    const isConfirmed = window.confirm('정말로 회원 탈퇴를 진행하시겠습니까?\n저장된 모든 즐겨찾기 데이터가 영구적으로 삭제됩니다.');
    
    if (isConfirmed) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete('http://localhost:3000/mypage/withdraw', {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.clear();
        alert('회원 탈퇴가 완료되었습니다.');
        window.location.replace('/login');
      } catch (error) {
        console.error('탈퇴 처리 중 에러 발생:', error);
        alert('탈퇴 처리 중 문제가 발생했습니다.');
      }
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/inquiries', 
        { 
          title: inquiryCategory, 
          content: inquiryContent 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert('문의가 성공적으로 접수되었습니다. 관리자가 확인 후 반영하겠습니다.');
      setIsModalOpen(false);
      setInquiryContent('');
      setInquiryCategory('[팀 추가 요청]');
    } catch (error) {
      console.error('문의 접수 실패:', error);
      alert('문의 접수 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800`}></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-fadeIn pb-10">
      
      <div className="bg-white px-10 py-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap items-center gap-10">
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">닉네임</span>
            <span className="text-2xl font-black text-[#141b26]">{profile?.nickname || '사용자'}</span>
          </div>
          
          <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">가입일</span>
            <span className="text-lg font-bold text-gray-700">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'}
            </span>
          </div>
          
          <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">즐겨찾기한 팀</span>
            <span className="text-lg font-black text-gray-800">{profile?.favoriteTeamCount || 0} <span className="text-sm font-bold text-gray-400">개</span></span>
          </div>
          
          <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">즐겨찾기한 국가</span>
            <span className="text-lg font-black text-gray-800">{profile?.favoriteNationCount || 0} <span className="text-sm font-bold text-gray-400">개</span></span>
          </div>

        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-bold text-[#141b26] bg-[#41e307] hover:opacity-80 px-5 py-2.5 rounded-xl transition-opacity shadow-sm"
          >
            지원 및 문의하기
          </button>
          
          <button 
            onClick={handleWithdraw}
            className="text-sm font-bold text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 px-5 py-2.5 rounded-xl transition-colors"
          >
            회원 탈퇴
          </button>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100">
        <h3 className="text-2xl font-black text-[#141b26] mb-8 flex items-center gap-3 tracking-tight">
          <span className={`w-2.5 h-8 rounded-full shadow-sm ${teamAccentBg}`}></span>
          즐겨찾기한 리그 팀
        </h3>
        
        <div className="flex gap-5 overflow-x-auto pb-4 custom-scrollbar">
          {favoriteTeams.length === 0 ? (
            <div className="w-full bg-gray-50 rounded-2xl py-12 flex items-center justify-center text-gray-400 text-sm font-bold border border-gray-100">
              즐겨찾기한 팀이 없습니다.
            </div>
          ) : (
            favoriteTeams.map((team) => (
              <div 
                key={team.id} 
                onClick={() => {
                  setActiveMode('league');
                  navigate('/leagues', { state: { targetTeamId: team.team_id } });
                }}
                className={`w-32 h-32 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border-2 border-transparent hover:bg-white ${teamHoverBorder} hover:shadow-md transition-all p-5 shrink-0 group cursor-pointer`}
                title={team.team_name}
              >
                {team.logo_url ? (
                  <img src={team.logo_url} alt={team.team_name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <span className="text-xs text-gray-400 font-bold">로고 없음</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100">
        <h3 className="text-2xl font-black text-[#141b26] mb-8 flex items-center gap-3 tracking-tight">
          <span className={`w-2.5 h-8 rounded-full shadow-sm ${nationAccentBg}`}></span>
          즐겨찾기한 국가
        </h3>
        
        <div className="flex gap-5 overflow-x-auto pb-4 custom-scrollbar">
          {favoriteNations.length === 0 ? (
            <div className="w-full bg-gray-50 rounded-2xl py-12 flex items-center justify-center text-gray-400 text-sm font-bold border border-gray-100">
              즐겨찾기한 국가가 없습니다.
            </div>
          ) : (
            favoriteNations.map((nation) => (
              <div 
                key={nation.id}
                onClick={() => {
                  setActiveMode('national');
                  navigate(`/nations/${nation.nation_id}`);
                }}
                className={`w-32 h-32 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border-2 border-transparent hover:bg-white ${nationHoverBorder} hover:shadow-md transition-all p-5 shrink-0 group cursor-pointer`}
                title={nation.nation_name}
              >
                {nation.logo_url ? (
                  <img src={nation.logo_url} alt={nation.nation_name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 shadow-sm rounded-full" />
                ) : (
                  <span className="text-xs text-gray-400 font-bold">로고 없음</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-200 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Goalytics 문의하기</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 font-bold text-xl">✕</button>
            </div>
            
            <form onSubmit={handleInquirySubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">문의 유형</label>
                <select 
                  value={inquiryCategory}
                  onChange={(e) => setInquiryCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#41e307] font-medium bg-white"
                >
                  <option value="[팀 추가 요청]">팀 추가 요청</option>
                  <option value="[국가 추가 요청]">국가 추가 요청</option>
                  <option value="[기능 추가 요청]">기능 추가 요청</option>
                  <option value="[기타 문의]">기타 문의</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">상세 내용</label>
                <textarea 
                  value={inquiryContent}
                  onChange={(e) => setInquiryContent(e.target.value)}
                  placeholder="추가를 원하시는 팀명이나 기능 등을 자유롭게 적어주세요."
                  rows={5}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#41e307] font-medium resize-none"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#141b26] text-white font-bold text-lg py-4 rounded-xl hover:bg-black transition mt-2 shadow-sm"
              >
                문의 접수하기
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}