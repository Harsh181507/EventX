// 📍 File: event-system/server/models/Event.js

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },

  // 🔥 NEW FIELDS
  maxParticipants: {
    type: Number,
    default: 100
  },
  category: {
    type: String,
    enum: ["Tech", "Workshop", "Seminar", "Sports"],
    default: "Tech"
  },
  status: {
    type: String,
    enum: ["upcoming", "completed"],
    default: "upcoming"
  },
  image: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);