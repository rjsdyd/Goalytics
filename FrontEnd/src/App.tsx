import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import Header from './components/Header';
import LiveMatch from './components/LiveMatch';
import Standings from './components/History';
import MiniStats from './components/MiniStats';
import UpcomingFixtures from './components/NewsWidget';
import MatchPredictions from './components/ModeSelector';
import UCLContent from './components/UCLContent';
import AuthPage from './pages/AuthPage';
import LeaguesPage from './pages/LeaguesPage';
import UELContent from './components/UELContent';
import NationalContent from './components/NationalContent';
import Nations from './pages/Nations';
import NationDetail from './pages/NationDetail';
import MyPage from './components/Mypage';
import AdminPage from './pages/AdminPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TierMaker from './pages/TierMaker';

export const ModeContext = createContext<any>(null);

function Dashboard() {
  const { activeMode } = useContext(ModeContext);

  return (
    <div className="flex flex-col gap-6">
      <style>{`
        @keyframes smoothFadeIn {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .mode-transition {
          animation: smoothFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

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
        {activeMode === 'uel' && <UELContent/>}
        {activeMode === 'national' && <NationalContent/>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex">
          <UpcomingFixtures />
        </div>
        <div className="lg:col-span-4 flex">
          <MatchPredictions />
        </div>
      </div>

      <footer className="mt-12 mb-6 px-4 flex flex-col items-center justify-center gap-2">
        <div className="flex gap-6 text-sm font-bold text-gray-400">
          <Link to="/privacy" className="hover:text-[#141b26] transition-colors">
            개인정보처리방침
          </Link>
          <Link to="/terms" className="hover:text-[#141b26] transition-colors">
            이용약관
          </Link>
        </div>
        <p className="text-xs text-gray-400 font-medium mt-2">
          © 2026 Goalytics. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isPrivacyPage = location.pathname === '/privacy';
  const isTermsPage = location.pathname === '/terms';

  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans text-gray-800">
      <div className="max-w-[1200px] mx-auto">
        {(!isLoginPage && !isPrivacyPage && !isTermsPage) && <Header />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route 
            path="/mypage" 
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          {/* 💡 나만의 티어 리스트 페이지 라우팅 추가 (로그인 유저 전용) */}
          <Route 
            path="/tier-maker" 
            element={
              <ProtectedRoute>
                <TierMaker />
              </ProtectedRoute>
            } 
          />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/nations" element={<Nations />} />
          <Route path="/nations/:id" element={<NationDetail />} />
          <Route path="/login" element={<AuthPage />} />
          
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [activeMode, setActiveMode] = useState(() => {
    return localStorage.getItem('goalytics_active_mode') || 'league';
  });

  useEffect(() => {
    localStorage.setItem('goalytics_active_mode', activeMode);
  }, [activeMode]);

  return (
    <ModeContext.Provider value={{ activeMode, setActiveMode }}>
      <BrowserRouter>
        <style>{`
          html { overflow-y: scroll; } 
        `}</style>
        <AppLayout />
      </BrowserRouter>
    </ModeContext.Provider>
  );
}