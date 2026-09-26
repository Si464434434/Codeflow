const Contact = require("../models/Contact.model");
const { sendContactAck } = require("../utils/email");

// POST /api/contact  — public
const submitContact = async (req, res) => {
  const { name, email, college, interest, message } = req.body;

  const contact = await Contact.create({ name, email, college, interest, message, type: "contact" });

  try {
    await sendContactAck({ name, email });
  } catch (err) {
    console.warn("⚠️  Contact ack email failed:", err.message);
  }

  res.status(201).json({
    success: true,
    message: "Message received! We'll get back to you within 24–48 hours.",
  });
};

// GET /api/contact  — admin only
const getContacts = async (req, res) => {
  const { read, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (read !== undefined) filter.read = read === "true";

  const total = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ success: true, total, contacts });
};

// PATCH /api/contact/:id/read  — admin only
const markRead = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!contact) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, contact });
};

// DELETE /api/contact/:id  — admin only
const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Deleted" });
};

module.exports = { submitContact, getContacts, markRead, deleteContact };
