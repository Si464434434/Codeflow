const Member = require("../models/Member.model");
const { sendWelcomeEmail, sendAdminNotification } = require("../utils/email");

// POST /api/members  — public (join form)
const joinCommunity = async (req, res) => {
  const { name, email, college, interest, message } = req.body;

  const existing = await Member.findOne({ email });
  if (existing) {
    return res.status(409).json({
      success: false,
      message: "This email is already registered. Welcome back!",
    });
  }

  const member = await Member.create({ name, email, college, interest, message });

  // Send emails (fire and forget — don't fail request if email fails)
  try {
    await sendWelcomeEmail({ name, email, interest });
    await Member.findByIdAndUpdate(member._id, { welcomeEmailSent: true });
    await sendAdminNotification({ name, email, college, interest });
  } catch (emailErr) {
    console.warn("⚠️  Email send failed:", emailErr.message);
  }

  res.status(201).json({
    success: true,
    message: "You've joined CodeFlow! Check your email for next steps 🎉",
    member: { id: member._id, name: member.name, email: member.email },
  });
};

// GET /api/members  — admin only
const getMembers = async (req, res) => {
  const { status, interest, search, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (interest) filter.interest = interest;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { college: { $regex: search, $options: "i" } },
    ];
  }

  const total = await Member.countDocuments(filter);
  const members = await Member.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({
    success: true,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    members,
  });
};

// PATCH /api/members/:id/status  — admin only
const updateStatus = async (req, res) => {
  const { status } = req.body;
  const member = await Member.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!member) return res.status(404).json({ success: false, message: "Member not found" });

  res.json({ success: true, message: `Member status updated to ${status}`, member });
};

// DELETE /api/members/:id  — admin only
const deleteMember = async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ success: false, message: "Member not found" });

  res.json({ success: true, message: "Member deleted" });
};

module.exports = { joinCommunity, getMembers, updateStatus, deleteMember };
