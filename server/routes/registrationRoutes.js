// 📍 File: event-system/server/routes/registrationRoutes.js

const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ REGISTER FOR AN EVENT (protected)
router.post("/register/:eventId", authMiddleware, async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Prevent registering for completed events
    if (event.status === "completed") {
      return res.status(400).json({ message: "This event has already completed" });
    }

    // Prevent duplicate registration
    const existing = await Registration.findOne({ user: req.user.id, event: eventId });
    if (existing) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    // Check capacity
    const count = await Registration.countDocuments({ event: eventId });
    if (count >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Create registration
    const registration = new Registration({
      user: req.user.id,
      event: eventId,
      paymentStatus: event.price > 0 ? "pending" : "paid",
    });

    await registration.save();

    res.status(201).json({ message: "Registered successfully", registration });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET MY REGISTRATIONS (protected)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate("event")
      .sort({ registeredAt: -1 });

    res.json(registrations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET REGISTRATION COUNT FOR AN EVENT (public — useful for capacity display)
router.get("/count/:eventId", async (req, res) => {
  try {
    const count = await Registration.countDocuments({ event: req.params.eventId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;