// 📍 File: event-system/client/src/pages/Auth.jsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error on typing
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const url = isLogin ? `${API}/users/login` : `${API}/users/register`;
      const res = await axios.post(url, form);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        // Trigger Navbar to re-check auth state
        window.dispatchEvent(new Event("storage"));
        navigate("/dashboard");
      } else {
        // After register, switch to login
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
        setError("Account created! Please log in.");
      }

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Allow submitting with Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0b0b15] relative overflow-hidden">

      {/* Animated background */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute w-[600px] h-[600px] bg-purple-600 blur-3xl opacity-20 top-[-200px] left-[-200px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute w-[500px] h-[500px] bg-blue-600 blur-3xl opacity-20 bottom-[-200px] right-[-200px]"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-[360px] shadow-2xl"
      >
        <motion.h2
          key={isLogin}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white text-center mb-6"
        >
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </motion.h2>

        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.input
              key="name"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500 transition"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          )}
        </AnimatePresence>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500 transition"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        {/* Error / success message */}
        {error && (
          <p className={`text-sm mb-4 text-center ${error.includes("created") ? "text-green-400" : "text-red-400"}`}>
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-purple-500/30 transition disabled:opacity-60"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </motion.button>

        <p className="text-gray-400 text-sm mt-5 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-blue-400 ml-1 cursor-pointer hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

      </motion.div>
    </div>
  );
}

export default Auth;