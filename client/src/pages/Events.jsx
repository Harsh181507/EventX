// 📍 File: event-system/client/src/pages/Events.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api";

// Category color mapping
const categoryColors = {
  Tech: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Workshop: "bg-green-500/20 text-green-300 border-green-500/30",
  Seminar: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Sports: "bg-red-500/20 text-red-300 border-red-500/30",
};

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }

    setRegisteringId(eventId);
    try {
      await axios.post(
        `${API}/registrations/register/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Registered successfully 🎉");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setRegisteringId(null);
    }
  };

  // ─── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0b0b15]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b15] text-white px-6 py-24">

      <h1 className="text-4xl font-bold text-center mb-2">Explore Events 🚀</h1>
      <p className="text-gray-400 text-center mb-12 text-sm">
        Browse and register for upcoming events
      </p>

      {/* Empty state */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 gap-3 text-gray-500">
          <span className="text-5xl">📭</span>
          <p className="text-lg">No events available right now.</p>
          <p className="text-sm">Check back later!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onRegister={handleRegister}
              isRegistering={registeringId === event._id}
            />
          ))}
        </div>
      )}

    </div>
  );
}

// ─── EventCard ─────────────────────────────────────────────────────────────────
function EventCard({ event, onRegister, isRegistering }) {
  const isCompleted = event.status === "completed";
  const catColor = categoryColors[event.category] || "bg-purple-500/20 text-purple-300 border-purple-500/30";

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 transition flex flex-col"
    >
      {/* Top badges */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs px-2 py-1 rounded-full border ${catColor}`}>
          {event.category}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${
            isCompleted
              ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
              : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
          }`}
        >
          {isCompleted ? "Completed" : "Upcoming"}
        </span>
      </div>

      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>

      <p className="text-gray-400 text-sm mb-4 flex-1">
        {event.description || "No description provided."}
      </p>

      <div className="text-sm text-gray-300 mb-2">
        📅 {new Date(event.date).toDateString()}
      </div>

      <div className="text-sm text-gray-300 mb-1">
        💰 {event.price === 0 ? "Free" : `₹${event.price}`}
      </div>

      <div className="text-sm text-gray-400 mb-6">
        👥 Max {event.maxParticipants} participants
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onRegister(event._id)}
        disabled={isCompleted || isRegistering}
        className={`w-full py-2 rounded-lg font-semibold transition ${
          isCompleted
            ? "bg-gray-600/40 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/30"
        }`}
      >
        {isRegistering ? "Registering..." : isCompleted ? "Event Ended" : "Register"}
      </motion.button>
    </motion.div>
  );
}

export default Events;