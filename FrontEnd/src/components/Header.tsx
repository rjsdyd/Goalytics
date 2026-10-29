// src/components/Header.tsx

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Zustand에서 로그인 상태, 닉네임, 로그아웃 함수 가져오기
  const { isAuthenticated, nickname, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // 로컬 스토리지 비우기 및 상태 초기화
    alert('로그아웃 되었습니다.');
    navigate('/'); // 메인 화면으로 이동
  };

  return (
    <header className="flex justify-between items-center mb-8">
      {/* 1. 로고 */}
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Goal<span className="text-[#41e307]">ytics</span>
        </h1>
      </Link>

      {/* 2. 네비게이션 및 로그인/유저 상태 표시 */}
      <div className="flex items-center gap-6 font-semibold">
        {/* 네비게이션 링크 */}
        <Link 
          to="/" 
          className={`${location.pathname === '/' ? 'text-gray-800' : 'text-gray-400 hover:text-gray-800'} transition`}
        >
          Dashboard
        </Link>
        <Link 
          to="/leagues" 
          className={`${location.pathname === '/leagues' ? 'text-gray-800' : 'text-gray-400 hover:text-gray-800'} transition`}
        >
          Leagues
        </Link>
        
        {/* 3. 로그인 상태에 따른 버튼 조건부 렌더링 */}
        {isAuthenticated ? (
          // 로그인 된 상태의 UI
          <div className="flex items-center gap-4 ml-4">
            <span className="text-sm font-medium text-gray-600">
              <span className="font-bold text-[#141b26]">{nickname}</span>님 환영합니다!
            </span>
            <button 
              onClick={handleLogout}
              className="bg-[#41e307] text-gray-600 border border-gray-200 px-5 py-2.5 rounded-full text-sm hover:bg-gray-200 transition shadow-sm"
            >
              로그아웃
            </button>
          </div>
        ) : (
          // 로그인이 안 된 상태의 UI
          <Link 
            to="/login"
            className="bg-[#141b26] text-white px-5 py-2.5 rounded-full text-sm hover:bg-gray-800 transition shadow-sm inline-block ml-4"
          >
            로그인 / 회원가입
          </Link>
        )}
      </div>
    </header>
  );
}