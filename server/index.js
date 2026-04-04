// 📍 File: event-system/server/index.js

// 📦 Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const emailRoutes = require("./routes/emailRoutes");
const authMiddleware = require("./middleware/authMiddleware");

// 🚀 App init
const app = express();

// 🛠 Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// 🌐 Health check route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🔗 Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/email", emailRoutes);

// 🔐 Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

// ❌ 404 catch-all for unknown API routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 🔌 MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error ❌:", err.message);
    process.exit(1);
  });