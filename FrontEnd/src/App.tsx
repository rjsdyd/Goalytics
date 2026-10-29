// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LiveMatch from './components/LiveMatch';
import Standings from './components/History';
import MiniStats from './components/MiniStats';
import UpcomingFixtures from './components/UpcomingFixtures';
import MatchPredictions from './components/MatchPredictions';
import AuthPage from './pages/AuthPage';
import LeaguesPage from './pages/LeaguesPage'; // ✅ 추가

function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <LiveMatch />
      <Standings />
      <div className="lg:col-span-3 flex flex-col gap-6">
        <MiniStats />
      </div>
      <UpcomingFixtures />
      <MatchPredictions />
    </div>
  );
}

// ❌ 기존에 있던 function Leagues() {...} 부분은 삭제했습니다.

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen p-8 font-sans text-gray-800">
        <div className="max-w-[1200px] mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* ✅ 빈 화면 대신 방금 만든 LeaguesPage 연결 */}
            <Route path="/leagues" element={<LeaguesPage />} />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;