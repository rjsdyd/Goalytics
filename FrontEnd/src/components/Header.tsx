// src/components/Header.tsx
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModeContext } from '../App';

export default function Header() {
  const { activeMode } = useContext(ModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState(''); 
  const [role, setRole] = useState('user'); // 💡 유저 권한(role)을 저장할 상태 추가

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedNickname = localStorage.getItem('nickname'); 
    const storedRole = localStorage.getItem('role'); // 💡 저장된 role 불러오기

    if (token) {
      setIsLoggedIn(true);
      if (storedNickname) {
        setNickname(storedNickname);
      }
      if (storedRole) {
        setRole(storedRole); // 💡 role 상태 업데이트
      }
    }
  }, []);

  const isUCL = activeMode === 'ucl';
  const isUEL = activeMode === 'uel';
  const isNational = activeMode === 'national';

  let brandColor = 'text-[#41e307]';
  let btnColor = 'bg-[#41e307] text-[#141b26]';
  let hoverBrandColor = 'hover:text-[#41e307] hover:drop-shadow-[0_0_8px_rgba(65,227,7,0.4)]';
  
  if (isUCL) {
    brandColor = 'text-blue-900';
    btnColor = 'bg-blue-900 text-white';
    hoverBrandColor = 'hover:text-blue-900 hover:drop-shadow-[0_0_8px_rgba(30,58,138,0.4)]';
  } else if (isUEL) {
    brandColor = 'text-orange-500';
    btnColor = 'bg-orange-500 text-white';
    hoverBrandColor = 'hover:text-orange-500 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]';
  } else if (isNational) {
    brandColor = 'text-purple-500';
    btnColor = 'bg-purple-500 text-white';
    hoverBrandColor = 'hover:text-purple-500 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]';
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/login'); 
  };

  return (
    <header className="flex justify-between items-center py-6 mb-4">
      <Link 
        to="/" 
        className={`text-3xl font-black tracking-tight cursor-pointer transition-all duration-300 active:scale-95 ${hoverBrandColor}`}
      >
        Goal<span className={brandColor}>y</span>tics
      </Link>
      
      <nav className="flex items-center gap-8 font-bold text-sm">
        {/* 💡 권한(role)이 admin이면 관리자 페이지, 아니면 마이페이지 출력 */}
        {isLoggedIn && (
          role === 'admin' ? (
            <Link to="/admin" className="text-gray-900 hover:opacity-70 transition">관리자 페이지</Link>
          ) : (
            <Link to="/mypage" className="text-gray-900 hover:opacity-70 transition">마이페이지</Link>
          )
        )}
        
        <Link to="/" className="text-gray-900 hover:opacity-70 transition">Dashboard</Link>
        
        {activeMode === 'league' && (
          <Link to="/leagues" className="text-gray-400 hover:text-gray-900 transition">Leagues</Link>
        )}
        {activeMode === 'national' && (
          <Link to="/nations" className="text-gray-400 hover:text-gray-900 transition">국가</Link>
        )}
        
        <div className="flex items-center gap-4 ml-6">
          {isLoggedIn ? (
            <>
              <span className="text-gray-600">{nickname ? `${nickname}님 환영합니다!` : '환영합니다!'}</span>
              <button 
                onClick={handleLogout}
                className={`${btnColor} px-5 py-2.5 rounded-full transition shadow-sm font-bold`}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button 
              onClick={() => window.location.replace('/login')}
              className={`${btnColor} px-5 py-2.5 rounded-full transition shadow-sm font-bold`}
            >
              로그인
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}