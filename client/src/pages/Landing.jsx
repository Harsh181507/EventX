// 📍 File: event-system/client/src/pages/Landing.jsx
//
// 📦 No new installs needed — uses existing:
//    framer-motion, react-router-dom (already in package.json)
//
// 🔤 Fonts — add these two lines inside the <head> of
//    client/index.html  (before the closing </head> tag):
//
//    <link rel="preconnect" href="https://fonts.googleapis.com">
//    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">

import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

// ─── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 18);
    return () => clearInterval(timer);
  }, [to]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

// ─── Floating ticket card ──────────────────────────────────────────────────────
function TicketCard({ delay, title, date, category, x, y, rotate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        left: x, top: y,
        transform: `rotate(${rotate}deg)`,
        position: "absolute",
        width: "200px",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "16px",
        padding: "16px",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,191,36,0.8)" }}>
          {category}
        </span>
        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#07070f", border: "1px solid rgba(255,255,255,0.1)" }} />
      </div>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", marginBottom: "10px" }} />
      <p style={{ color: "white", fontSize: "13px", fontWeight: 400, lineHeight: 1.4, marginBottom: "6px" }}>{title}</p>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>{date}</p>
      <div style={{ marginTop: "10px", display: "flex", gap: "3px" }}>
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Feature pill ──────────────────────────────────────────────────────────────
function FeaturePill({ icon, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "7px 16px",
        borderRadius: "100px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "rgba(255,255,255,0.55)",
        fontSize: "13px",
        cursor: "default",
        transition: "all 0.3s",
      }}
    >
      <span style={{ fontSize: "14px" }}>{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
}

// ─── Step card ─────────────────────────────────────────────────────────────────
function StepCard({ step, title, body, accent, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      style={{
        position: "relative",
        borderRadius: "20px",
        padding: "28px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
        overflow: "hidden",
      }}
    >
      <span style={{
        display: "block",
        fontSize: "48px",
        lineHeight: 1,
        marginBottom: "20px",
        color: accent,
        fontFamily: "'Instrument Serif', serif",
        fontStyle: "italic",
      }}>
        {step}
      </span>
      <h3 style={{ color: "white", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "13px", lineHeight: 1.7 }}>{body}</p>
    </motion.div>
  );
}

// ─── Main Landing component ────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        background: "#07070f",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >

      {/* ── Grain texture ─────────────────────────────────────────────────────── */}
      <div style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        zIndex: 1,
        opacity: 0.032,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px",
      }} />

      {/* ── Ambient lights ────────────────────────────────────────────────────── */}
      <div style={{ pointerEvents: "none", position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", width: "900px", height: "900px", borderRadius: "50%",
          top: "-350px", left: "-280px",
          background: "radial-gradient(circle, rgba(109,40,217,0.17) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
          top: "-180px", right: "-240px",
          background: "radial-gradient(circle, rgba(67,56,202,0.13) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          top: "35%", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
        }} />
      </div>

      {/* ── Floating ticket cards (desktop only) ──────────────────────────────── */}
      <div className="hidden lg:block" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <TicketCard delay={1.0} title="React Summit 2025"        date="Dec 14, 2025" category="Tech"     x="3%"  y="18%" rotate={-6} />
        <TicketCard delay={1.2} title="Design Systems Workshop"  date="Jan 08, 2026" category="Workshop" x="68%" y="10%" rotate={5}  />
        <TicketCard delay={1.4} title="AI & ML Seminar"          date="Feb 02, 2026" category="Seminar"  x="73%" y="54%" rotate={-4} />
        <TicketCard delay={1.1} title="Startup Sports Day"       date="Mar 01, 2026" category="Sports"   x="1%"  y="60%" rotate={4}  />
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: heroY, position: "relative", zIndex: 10 }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              marginBottom: "32px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              border: "1px solid rgba(251,191,36,0.22)",
              background: "rgba(251,191,36,0.07)",
            }}
          >
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#fbbf24",
              animation: "pulse 2s infinite",
            }} />
            <span style={{ color: "rgba(251,191,36,0.9)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
              Smart Event Management
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              maxWidth: "860px",
              fontSize: "clamp(42px, 7vw, 88px)",
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              margin: 0,
            }}
          >
            The{" "}
            <span style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
              background: "linear-gradient(135deg, #c4b5fd 0%, #818cf8 50%, #6d28d9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              smarter
            </span>{" "}
            way to run your events
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              marginTop: "24px",
              maxWidth: "480px",
              color: "rgba(255,255,255,0.42)",
              fontSize: "18px",
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            From registration to certificates — EventX handles the entire event
            lifecycle so you can focus on what matters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/auth")}
              style={{
                position: "relative",
                padding: "14px 32px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                color: "white",
                border: "none",
                cursor: "pointer",
                overflow: "hidden",
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                boxShadow: "0 0 32px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Get started free →
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/events")}
              style={{
                padding: "14px 32px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.65)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s",
              }}
            >
              Browse events
            </motion.button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}
          >
            <FeaturePill icon="🎟️" label="Event registration" delay={0.70} />
            <FeaturePill icon="📜" label="Auto certificates"  delay={0.78} />
            <FeaturePill icon="📧" label="Email notifications" delay={0.86} />
            <FeaturePill icon="🔐" label="Secure auth"        delay={0.94} />
          </motion.div>

        </div>
      </motion.div>

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.8 }}
        style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto", padding: "0 24px 96px" }}
      >
        <div style={{
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.025)",
          overflow: "hidden",
        }}>
          {/* top shimmer line */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.11), transparent)" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[
              { value: 1200, suffix: "+", label: "Events hosted" },
              { value: 48000, suffix: "+", label: "Registrations" },
              { value: 99, suffix: "%", label: "Uptime" },
            ].map(({ value, suffix, label }, i) => (
              <div
                key={label}
                style={{
                  textAlign: "center",
                  padding: "32px 16px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <div style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  color: "white",
                  marginBottom: "4px",
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                }}>
                  <Counter to={value} suffix={suffix} />
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── How it works ──────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: "1000px", margin: "0 auto", padding: "0 24px 120px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
            How it works
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "white",
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontWeight: 400,
            margin: 0,
          }}>
            Three steps to a perfect event
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          <StepCard step="01" title="Create your event"       accent="#7c3aed" delay={0}    body="Set the title, date, capacity, and category. Your event goes live instantly." />
          <StepCard step="02" title="Manage registrations"    accent="#4f46e5" delay={0.1}  body="Attendees sign up with a click. Capacity limits and duplicate checks are automatic." />
          <StepCard step="03" title="Issue certificates"      accent="#d97706" delay={0.2}  body="Once the event is complete, attendees download a beautiful PDF certificate in seconds." />
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 10, maxWidth: "900px", margin: "0 auto", padding: "0 24px 120px" }}
      >
        <div style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "72px 24px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(109,40,217,0.18) 0%, rgba(67,56,202,0.13) 100%)",
        }}>
          {/* top shimmer */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.45), transparent)",
          }} />

          <h2 style={{
            fontSize: "clamp(26px, 4vw, 48px)",
            color: "white",
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontWeight: 400,
            marginBottom: "16px",
          }}>
            Ready to run your first event?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "36px", fontSize: "15px", lineHeight: 1.65, maxWidth: "420px", margin: "0 auto 36px" }}>
            Join thousands of organisers who trust EventX for seamless, stress-free event management.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/auth")}
            style={{
              padding: "14px 36px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500,
              color: "white",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              boxShadow: "0 0 40px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Create your account →
          </motion.button>
        </div>
      </motion.section>

    </div>
  );
}