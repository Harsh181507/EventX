// 📍 File: event-system/client/src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api";

function Dashboard() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }
    fetchMyRegistrations(token);
  }, [navigate]);

  const fetchMyRegistrations = async (token) => {
    try {
      const res = await axios.get(`${API}/registrations/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistrations(res.data);
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
      if (err.response?.status === 401) {
        // Token expired
        localStorage.removeItem("token");
        navigate("/auth");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCertificate = async (eventId, eventTitle) => {
    const token = localStorage.getItem("token");
    setDownloadingId(eventId);
    try {
      const res = await axios.get(`${API}/certificate/generate/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // important for file download
      });

      // Create a download link and trigger it
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${eventTitle.replace(/\s+/g, "-")}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      // Server returns JSON error inside a blob — parse it
      if (err.response?.data instanceof Blob) {
        const text = await err.response.data.text();
        const parsed = JSON.parse(text);
        alert(parsed.message || "Could not download certificate");
      } else {
        alert(err.response?.data?.message || "Could not download certificate");
      }
    } finally {
      setDownloadingId(null);
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto mb-10"
      >
        <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
        <p className="text-gray-400 text-sm">Your registered events and certificates</p>
      </motion.div>

      {/* Empty state */}
      {registrations.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 gap-4 text-gray-500">
          <span className="text-5xl">🗂️</span>
          <p className="text-lg">You haven't registered for any events yet.</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-2 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold hover:scale-105 transition"
          >
            Explore Events
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {registrations.map((reg, index) => (
            <RegistrationCard
              key={reg._id}
              reg={reg}
              index={index}
              onDownload={handleDownloadCertificate}
              isDownloading={downloadingId === reg.event?._id}
            />
          ))}
        </div>
      )}

    </div>
  );
}

// ─── RegistrationCard ──────────────────────────────────────────────────────────
function RegistrationCard({ reg, index, onDownload, isDownloading }) {
  const event = reg.event;
  if (!event) return null;

  const isCompleted = event.status === "completed";
  const isAttended = reg.attendance;
  const canDownload = isCompleted && isAttended;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col gap-3"
    >
      {/* Event title + status */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold leading-tight">{event.title}</h2>
        <span
          className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${
            isCompleted
              ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
              : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
          }`}
        >
          {isCompleted ? "Completed" : "Upcoming"}
        </span>
      </div>

      {/* Details */}
      <div className="text-sm text-gray-300 flex flex-col gap-1">
        <span>📅 {new Date(event.date).toDateString()}</span>
        <span>🏷️ {event.category}</span>
        <span>💰 {event.price === 0 ? "Free" : `₹${event.price}`}</span>
      </div>

      {/* Status pills */}
      <div className="flex gap-2 flex-wrap mt-1">
        <span
          className={`text-xs px-2 py-1 rounded-full border ${
            reg.paymentStatus === "paid"
              ? "bg-green-500/20 text-green-300 border-green-500/30"
              : reg.paymentStatus === "failed"
              ? "bg-red-500/20 text-red-300 border-red-500/30"
              : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
          }`}
        >
          Payment: {reg.paymentStatus}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${
            reg.attendance
              ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
          }`}
        >
          {reg.attendance ? "✓ Attended" : "Not attended"}
        </span>
      </div>

      {/* Registered on */}
      <p className="text-xs text-gray-500">
        Registered on {new Date(reg.registeredAt).toDateString()}
      </p>

      {/* Certificate button */}
      <motion.button
        whileHover={canDownload ? { scale: 1.05 } : {}}
        whileTap={canDownload ? { scale: 0.95 } : {}}
        onClick={() => canDownload && onDownload(event._id, event.title)}
        disabled={!canDownload || isDownloading}
        className={`w-full py-2 rounded-lg text-sm font-semibold transition mt-2 ${
          canDownload
            ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
            : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
        }`}
      >
        {isDownloading
          ? "Downloading..."
          : canDownload
          ? "📜 Download Certificate"
          : isCompleted && !isAttended
          ? "Certificate requires attendance"
          : "Certificate available after event"}
      </motion.button>

    </motion.div>
  );
}

export default Dashboard;