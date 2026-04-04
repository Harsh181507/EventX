// 📍 File: event-system/server/routes/eventRoutes.js
//
// 📦 Requires: express-validator (npm install express-validator)

const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

// ─── Helper ────────────────────────────────────────────────────────────────────
const validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return false;
  }
  return true;
};

// ✅ GET ALL EVENTS (public)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET SINGLE EVENT (public)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ CREATE EVENT (protected)
router.post(
  "/create",
  authMiddleware,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("maxParticipants")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Max participants must be at least 1"),
    body("category")
      .optional()
      .isIn(["Tech", "Workshop", "Seminar", "Sports"])
      .withMessage("Invalid category"),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;

    try {
      const { title, description, date, price, maxParticipants, category, image } = req.body;

      const event = new Event({
        title,
        description,
        date,
        price,
        maxParticipants,
        category,
        image,
        createdBy: req.user.id,
      });

      await event.save();

      res.status(201).json({ message: "Event created successfully", event });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ✅ UPDATE EVENT STATUS (protected — only creator)
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["upcoming", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    event.status = status;
    await event.save();

    res.json({ message: "Event status updated", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;