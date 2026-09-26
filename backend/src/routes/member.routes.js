const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth.middleware");
const { joinCommunity, getMembers, updateStatus, deleteMember } = require("../controllers/member.controller");

// Public
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
    body("interest").notEmpty().withMessage("Please select an interest"),
  ],
  validate,
  joinCommunity
);

// Admin protected
router.get("/", protect, getMembers);
router.patch("/:id/status", protect, updateStatus);
router.delete("/:id", protect, deleteMember);

module.exports = router;
