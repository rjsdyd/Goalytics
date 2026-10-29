import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModeContext } from '../App';

export default function Header() {
  const { activeMode } = useContext(ModeContext);

  // 모드별 테마 색상 설정
  const isUCL = activeMode === 'ucl';
  const isUEL = activeMode === 'uel';
  const isNational = activeMode === 'national';

  let brandColor = 'text-[#41e307]';
  let btnColor = 'bg-[#41e307] text-[#141b26]';
  
  if (isUCL) {
    brandColor = 'text-blue-900';
    btnColor = 'bg-blue-900 text-white';
  } else if (isUEL) {
    brandColor = 'text-orange-500';
    btnColor = 'bg-orange-500 text-white';
  } else if (isNational) {
    brandColor = 'text-purple-500';
    btnColor = 'bg-purple-500 text-white';
  }

  return (
    <header className="flex justify-between items-center py-6 mb-4">
      <div className="text-3xl font-black tracking-tight cursor-pointer">
        Goal<span className={brandColor}>y</span>tics
      </div>
      
      <nav className="flex items-center gap-8 font-bold text-sm">
        <Link to="/" className="text-gray-900 hover:opacity-70 transition">Dashboard</Link>
        
        {/* 💡 리그 모드일 때만 Leagues 메뉴 표시 */}
        {activeMode === 'league' && (
          <Link to="/leagues" className="text-gray-400 hover:text-gray-900 transition">Leagues</Link>
        )}
        
        <div className="flex items-center gap-4 ml-6">
          <span className="text-gray-600">Mancity님 환영합니다!</span>
          <button className={`${btnColor} px-5 py-2.5 rounded-full transition shadow-sm font-bold`}>
            로그아웃
          </button>
        </div>
      </nav>
    </header>
  );
}