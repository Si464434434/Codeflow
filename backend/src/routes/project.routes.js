const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth.middleware");
const { getProjects, getProject, createProject, updateProject, deleteProject } = require("../controllers/project.controller");

// Public
router.get("/", getProjects);
router.get("/:id", getProject);

// Admin protected
router.post(
  "/",
  protect,
  [
    body("name").trim().notEmpty().withMessage("Project name is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  validate,
  createProject
);

router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
