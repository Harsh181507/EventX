// 📍 File: event-system/client/src/pages/Events.jsx
//
// 📦 No new installs — uses existing framer-motion, react-router-dom, axios
// 🔤 Uses fonts already loaded in index.html (Instrument Serif + DM Sans)
//
// ✨ New components added:
//    - Search bar (filters by title/description)
//    - Category filter tabs (All / Tech / Workshop / Seminar / Sports)
//    - Capacity progress bar on each card
//    - Toast notification instead of alert()
//    - Skeleton loading cards

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:5000/api";

const CATEGORIES = ["All", "Tech", "Workshop", "Seminar", "Sports"];

const CAT_STYLES = {
  Tech:     { bg: "rgba(59,130,246,0.12)", color: "#93c5fd", border: "rgba(59,130,246,0.25)" },
  Workshop: { bg: "rgba(16,185,129,0.12)", color: "#6ee7b7", border: "rgba(16,185,129,0.25)" },
  Seminar:  { bg: "rgba(245,158,11,0.12)", color: "#fcd34d", border: "rgba(245,158,11,0.25)" },
  Sports:   { bg: "rgba(239,68,68,0.12)",  color: "#fca5a5", border: "rgba(239,68,68,0.25)"  },
};

// ─── Toast notification ────────────────────────────────────────────────────────
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, x: "-50%" }}
      animate={{ opacity: 1, y: 0,  x: "-50%" }}
      exit={{   opacity: 0, y: 20,  x: "-50%" }}
      style={{
        position: "fixed", bottom: "32px", left: "50%",
        zIndex: 999,
        padding: "12px 24px",
        borderRadius: "100px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        background: type === "success"
          ? "linear-gradient(135deg,#065f46,#047857)"
          : "linear-gradient(135deg,#7f1d1d,#991b1b)",
        border: `1px solid ${type === "success" ? "rgba(52,211,153,0.3)" : "rgba(252,165,165,0.3)"}`,
      }}
    >
      <span>{type === "success" ? "✓" : "✕"}</span>
      {message}
    </motion.div>
  );
}

// ─── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{
      borderRadius: "20px",
      padding: "24px",
      border: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(255,255,255,0.025)",
      display: "flex", flexDirection: "column", gap: "12px",
    }}>
      {["60px", "24px", "80px", "16px", "16px", "40px"].map((h, i) => (
        <div key={i} style={{
          height: h, borderRadius: "6px",
          background: "rgba(255,255,255,0.05)",
          animation: "shimmer 1.5s infinite",
          width: i === 0 ? "45%" : i === 1 ? "75%" : i === 5 ? "100%" : "55%",
        }} />
      ))}
    </div>
  );
}

// ─── Capacity bar ──────────────────────────────────────────────────────────────
function CapacityBar({ count, max }) {
  const pct = max > 0 ? Math.min((count / max) * 100, 100) : 0;
  const color = pct >= 90 ? "#ef4444" : pct >= 60 ? "#f59e0b" : "#10b981";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Capacity
        </span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
          {count}/{max}
        </span>
      </div>
      <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ height: "100%", borderRadius: "2px", background: color }}
        />
      </div>
    </div>
  );
}

// ─── Event card ────────────────────────────────────────────────────────────────
function EventCard({ event, onRegister, isRegistering, index }) {
  const [count, setCount] = useState(0);
  const isCompleted = event.status === "completed";
  const cat = CAT_STYLES[event.category] || CAT_STYLES.Tech;
  const isFull = count >= event.maxParticipants;

  useEffect(() => {
    axios.get(`${API}/registrations/count/${event._id}`)
      .then(r => setCount(r.data.count))
      .catch(() => {});
  }, [event._id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        display: "flex", flexDirection: "column",
        transition: "border-color 0.3s, box-shadow 0.3s",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(124,58,237,0.12)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top row — category + status */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        <span style={{
          fontSize: "10px", fontWeight: 500, letterSpacing: "0.07em",
          textTransform: "uppercase", padding: "4px 10px", borderRadius: "100px",
          background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
        }}>
          {event.category}
        </span>
        <span style={{
          fontSize: "10px", fontWeight: 500, letterSpacing: "0.07em",
          textTransform: "uppercase", padding: "4px 10px", borderRadius: "100px",
          background: isCompleted ? "rgba(100,100,100,0.12)" : "rgba(16,185,129,0.12)",
          color: isCompleted ? "rgba(255,255,255,0.3)" : "#6ee7b7",
          border: `1px solid ${isCompleted ? "rgba(255,255,255,0.08)" : "rgba(16,185,129,0.25)"}`,
        }}>
          {isCompleted ? "Completed" : "● Live"}
        </span>
      </div>

      {/* Title */}
      <h2 style={{
        color: "white", fontSize: "18px", fontWeight: 500,
        lineHeight: 1.3, marginBottom: "10px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {event.title}
      </h2>

      {/* Description */}
      <p style={{
        color: "rgba(255,255,255,0.38)", fontSize: "13px",
        lineHeight: 1.65, marginBottom: "20px", flex: 1,
      }}>
        {event.description || "No description provided."}
      </p>

      {/* Meta info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
        {[
          { icon: "📅", text: new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
          { icon: "💰", text: event.price === 0 ? "Free" : `₹${event.price.toLocaleString()}` },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px" }}>{icon}</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Capacity bar */}
      <div style={{ marginBottom: "18px" }}>
        <CapacityBar count={count} max={event.maxParticipants} />
      </div>

      {/* Register button */}
      <motion.button
        whileHover={!isCompleted && !isFull ? { scale: 1.02 } : {}}
        whileTap={!isCompleted && !isFull ? { scale: 0.98 } : {}}
        onClick={() => !isCompleted && !isFull && onRegister(event._id)}
        disabled={isCompleted || isFull || isRegistering}
        style={{
          width: "100%",
          padding: "11px",
          borderRadius: "10px",
          border: "none",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          cursor: isCompleted || isFull ? "not-allowed" : "pointer",
          transition: "opacity 0.2s",
          ...(isCompleted || isFull ? {
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.25)",
          } : {
            background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            color: "white",
            boxShadow: "0 0 20px rgba(124,58,237,0.25)",
          }),
        }}
      >
        {isRegistering ? "Registering…"
          : isCompleted  ? "Event ended"
          : isFull       ? "Event full"
          : "Register now →"}
      </motion.button>
    </motion.div>
  );
}

// ─── Main Events page ──────────────────────────────────────────────────────────
export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [registeringId, setRegId]   = useState(null);
  const [toast, setToast]           = useState(null);
  const [search, setSearch]         = useState("");
  const [activeCategory, setActiveCat] = useState("All");

  useEffect(() => {
    axios.get(`${API}/events`)
      .then(r => setEvents(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleRegister = useCallback(async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/auth"); return; }
    setRegId(eventId);
    try {
      await axios.post(`${API}/registrations/register/${eventId}`, {},
        { headers: { Authorization: `Bearer ${token}` } });
      setToast({ message: "Registered successfully!", type: "success" });
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Registration failed", type: "error" });
    } finally {
      setRegId(null);
    }
  }, [navigate]);

  // Filter
  const visible = events.filter(e => {
    const matchCat  = activeCategory === "All" || e.category === activeCategory;
    const matchSearch = !search.trim() ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      (e.description || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07070f",
      fontFamily: "'DM Sans', sans-serif",
      color: "white",
      padding: "96px 24px 80px",
    }}>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
      `}</style>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>
            Discover
          </p>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontWeight: 400,
            margin: "0 0 32px",
            lineHeight: 1.1,
          }}>
            Upcoming events
          </h1>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "12px",
            padding: "12px 18px",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "16px" }}>⌕</span>
          <input
            type="text"
            placeholder="Search events…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "white", fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "16px" }}>
              ×
            </button>
          )}
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          {CATEGORIES.map(cat => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  padding: "7px 18px",
                  borderRadius: "100px",
                  border: `1px solid ${active ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.09)"}`,
                  background: active ? "rgba(124,58,237,0.2)" : "transparent",
                  color: active ? "#c4b5fd" : "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            );
          })}
          {/* Result count */}
          {!loading && (
            <span style={{
              marginLeft: "auto", fontSize: "13px",
              color: "rgba(255,255,255,0.25)",
              alignSelf: "center",
            }}>
              {visible.length} event{visible.length !== 1 ? "s" : ""}
            </span>
          )}
        </motion.div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : visible.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "100px 24px", color: "rgba(255,255,255,0.2)" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>◌</div>
            <p style={{ fontSize: "18px", marginBottom: "8px", color: "rgba(255,255,255,0.4)" }}>No events found</p>
            <p style={{ fontSize: "14px" }}>Try a different search or category</p>
            <button onClick={() => { setSearch(""); setActiveCat("All"); }}
              style={{
                marginTop: "24px", padding: "10px 24px", borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.12)", background: "transparent",
                color: "rgba(255,255,255,0.5)", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
              }}>
              Clear filters
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {visible.map((event, i) => (
                <EventCard
                  key={event._id}
                  event={event}
                  index={i}
                  onRegister={handleRegister}
                  isRegistering={registeringId === event._id}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* ── Toast ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <Toast
            key="toast"
            message={toast.message}
            type={toast.type}
            onDone={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}