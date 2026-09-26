require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const Admin = require("../models/Admin.model");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const existing = await Admin.findOne({ email: process.env.ADMIN_SEED_EMAIL });
  if (existing) {
    console.log("ℹ️  Admin already exists:", existing.email);
    process.exit(0);
  }

  await Admin.create({
    name: "CodeFlow Admin",
    email: process.env.ADMIN_SEED_EMAIL,
    password: process.env.ADMIN_SEED_PASSWORD,
    role: "superadmin",
  });

  console.log("🚀 Superadmin created:", process.env.ADMIN_SEED_EMAIL);
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
