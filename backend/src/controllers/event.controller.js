const Event = require("../models/Event.model");

// GET /api/events
const getEvents = async (req, res) => {
  const { status, type } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (type) filter.type = type;

  const events = await Event.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: events.length, events });
};

// GET /api/events/:id
const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.json({ success: true, event });
};

// POST /api/events  — admin only
const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json({ success: true, message: "Event created", event });
};

// PUT /api/events/:id  — admin only
const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.json({ success: true, message: "Event updated", event });
};

// DELETE /api/events/:id  — admin only
const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.json({ success: true, message: "Event deleted" });
};

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
