require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// ── Routes ──────────────────────────────────────────────────────────────────
const authRoutes     = require("./routes/auth.routes");
const memberRoutes   = require("./routes/member.routes");
const eventRoutes    = require("./routes/event.routes");
const projectRoutes  = require("./routes/project.routes");
const contactRoutes  = require("./routes/contact.routes");
const statsRoutes    = require("./routes/stats.routes");

// ── App ──────────────────────────────────────────────────────────────────────
const app = express();

// Connect DB
connectDB();

// ── Global middleware ─────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "CodeFlow API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/members",  memberRoutes);
app.use("/api/events",   eventRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact",  contactRoutes);
app.use("/api/stats",    statsRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 CodeFlow API running on http://localhost:${PORT}`);
});
