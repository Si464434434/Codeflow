const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth.middleware");
const { submitContact, getContacts, markRead, deleteContact } = require("../controllers/contact.controller");

// Public
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
    body("interest").notEmpty().withMessage("Interest is required"),
  ],
  validate,
  submitContact
);

// Admin protected
router.get("/", protect, getContacts);
router.patch("/:id/read", protect, markRead);
router.delete("/:id", protect, deleteContact);

module.exports = router;
