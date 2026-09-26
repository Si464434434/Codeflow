const Project = require("../models/Project.model");

// GET /api/projects
const getProjects = async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const projects = await Project.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: projects.length, projects });
};

// GET /api/projects/:id
const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: "Project not found" });
  res.json({ success: true, project });
};

// POST /api/projects  — admin only
const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, message: "Project created", project });
};

// PUT /api/projects/:id  — admin only
const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) return res.status(404).json({ success: false, message: "Project not found" });
  res.json({ success: true, message: "Project updated", project });
};

// DELETE /api/projects/:id  — admin only
const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: "Project not found" });
  res.json({ success: true, message: "Project deleted" });
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
