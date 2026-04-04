// 📍 File: event-system/client/src/components/Navbar.jsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state on mount and when storage changes
  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate("/")}
        >
          EventX
        </motion.h1>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm">
          <NavItem text="Home" onClick={() => navigate("/")} />
          <NavItem text="Events" onClick={() => navigate("/events")} />
          {isLoggedIn && (
            <NavItem text="Dashboard" onClick={() => navigate("/dashboard")} />
          )}
        </div>

        {/* Auth Button */}
        {isLoggedIn ? (
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 font-medium transition"
          >
            Logout
          </motion.button>
        ) : (
          <motion.button
            onClick={() => navigate("/auth")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-purple-500/30 transition"
          >
            Login
          </motion.button>
        )}

      </div>
    </div>
  );
}

export default Navbar;

// ─── NavItem subcomponent ──────────────────────────────────────────────────────
function NavItem({ text, onClick }) {
  return (
    <div onClick={onClick} className="relative group cursor-pointer">
      <span className="group-hover:text-white transition">{text}</span>
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}