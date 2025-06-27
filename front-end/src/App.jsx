import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}