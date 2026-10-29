import { createContext, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LiveMatch from './components/LiveMatch';
import Standings from './components/History';
import MiniStats from './components/MiniStats';
import UpcomingFixtures from './components/NewsWidget';
import MatchPredictions from './components/ModeSelector';
import UCLContent from './components/UCLContent'; // 💡 새로 만들 챔스 컴포넌트
import AuthPage from './pages/AuthPage';
import LeaguesPage from './pages/LeaguesPage';

// 💡 1. 모드 상태를 전역으로 공유하기 위한 Context 생성
export const ModeContext = createContext<any>(null);

function Dashboard() {
  const { activeMode } = useContext(ModeContext);

  return (
    <div className="flex flex-col gap-6">
      
      {/* 💡 1. 부드러운 전환을 위한 커스텀 CSS 애니메이션 주입 */}
      <style>{`
        @keyframes smoothFadeIn {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .mode-transition {
          animation: smoothFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* 💡 2. key={activeMode}를 부여하여 모드가 바뀔 때마다 애니메이션이 재실행되게 설정 */}
      <div key={activeMode} className="mode-transition">
        
        {activeMode === 'league' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <LiveMatch />
            <Standings />
            <div className="lg:col-span-3 flex flex-col gap-6">
              <MiniStats />
            </div>
          </div>
        )}

        {activeMode === 'ucl' && <UCLContent />}
        
        {/* 유로파, 국대 임시 화면도 높이를 420px로 맞춰서 덜컹거림 방지 */}
        {activeMode === 'uel' && (
          <div className="h-[420px] flex items-center justify-center bg-orange-50 rounded-[32px] font-bold text-orange-500 text-xl shadow-sm">
            유로파 모드 준비 중...
          </div>
        )}
        {activeMode === 'national' && (
          <div className="h-[420px] flex items-center justify-center bg-purple-50 rounded-[32px] font-bold text-purple-500 text-xl shadow-sm">
            국대 모드 준비 중...
          </div>
        )}
      </div>

      {/* 하단 영역 (뉴스 & 모드 선택기) - 이 부분은 고정되어 부드러운 전환감을 더욱 돋보이게 함 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex">
          <UpcomingFixtures />
        </div>
        <div className="lg:col-span-4 flex">
          <MatchPredictions />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // 앱 전체의 현재 모드 상태 (기본값: league)
  const [activeMode, setActiveMode] = useState('league');

  return (
    // Provider로 감싸서 하위 컴포넌트들이 activeMode를 읽고 쓸 수 있게 합니다.
    <ModeContext.Provider value={{ activeMode, setActiveMode }}>
      <BrowserRouter>
        <div className="bg-gray-50 min-h-screen p-8 font-sans text-gray-800">
          <div className="max-w-[1200px] mx-auto">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leagues" element={<LeaguesPage />} />
              <Route path="/login" element={<AuthPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ModeContext.Provider>
  );
}