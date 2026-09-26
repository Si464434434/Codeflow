const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await Admin.findOne({ email });
  if (existing) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }

  const admin = await Admin.create({ name, email, password, role });
  const token = signToken(admin._id);

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const token = signToken(admin._id);

  res.json({
    success: true,
    message: "Login successful",
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ success: true, admin: req.admin });
};

module.exports = { register, login, getMe };
