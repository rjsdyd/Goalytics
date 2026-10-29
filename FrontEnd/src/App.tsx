// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LiveMatch from './components/LiveMatch';
import Standings from './components/History';
import MiniStats from './components/MiniStats';
import UpcomingFixtures from './components/NewsWidget';
import MatchPredictions from './components/MatchPredictions';
import AuthPage from './pages/AuthPage';
import LeaguesPage from './pages/LeaguesPage';

function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 상단 영역 */}
      <LiveMatch />
      <Standings />
      <div className="lg:col-span-3 flex flex-col gap-6">
        <MiniStats />
      </div>

      {/* 💡 하단 영역: 뉴스 위젯(8)과 AI 예측 위젯(4)을 가로 12 그리드로 완벽 대칭 배치 */}
      <div className="lg:col-span-8 flex">
        <UpcomingFixtures />
      </div>
      <div className="lg:col-span-4 flex">
        <MatchPredictions />
      </div>
    </div>
  );
}

function App() {
  return (
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
  );
}

export default App;