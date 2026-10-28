import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="flex justify-between items-center mb-8">
      {/* 1. 로고 (! 아이콘 제거 및 홈 링크 적용) */}
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Goal<span className="text-[#41e307]">ytics</span>
        </h1>
      </Link>

      {/* 2. 네비게이션 및 로그인 버튼 */}
      <div className="flex items-center gap-6 font-semibold">
        {/* 현재 주소에 따라 글자 색상을 다르게 표시하여 활성화 상태를 나타냅니다 */}
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
        
        {/* 3. 로그인/회원가입 버튼 (다크 톤 적용) */}
        <button className="bg-[#141b26] text-white px-5 py-2.5 rounded-full text-sm hover:bg-gray-800 transition shadow-sm">
          로그인 / 회원가입
        </button>
      </div>
    </header>
  );
}