// 📍 File: event-system/client/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<Events />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 404 catch-all */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center bg-[#0b0b15] text-white flex-col gap-4">
              <h1 className="text-5xl font-bold text-purple-400">404</h1>
              <p className="text-gray-400">Page not found.</p>
              <a href="/" className="text-blue-400 hover:underline text-sm">
                Go back home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;