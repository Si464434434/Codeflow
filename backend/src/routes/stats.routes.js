const express = require("express");
const router = express.Router();
const Member = require("../models/Member.model");
const Event = require("../models/Event.model");
const Project = require("../models/Project.model");
const Contact = require("../models/Contact.model");

// GET /api/stats  — public
router.get("/", async (req, res) => {
  const [members, events, projects, contacts] = await Promise.all([
    Member.countDocuments({ status: "approved" }),
    Event.countDocuments(),
    Project.countDocuments(),
    Contact.countDocuments(),
  ]);

  res.json({
    success: true,
    stats: {
      members,
      events,
      projects,
      contacts,
      // Static for now — update as community grows
      collaborations: 10,
    },
  });
});

// GET /api/stats/admin  — detailed stats for admin dashboard
router.get("/admin", async (req, res) => {
  const [
    totalMembers,
    pendingMembers,
    approvedMembers,
    upcomingEvents,
    pastEvents,
    liveProjects,
    unreadContacts,
  ] = await Promise.all([
    Member.countDocuments(),
    Member.countDocuments({ status: "pending" }),
    Member.countDocuments({ status: "approved" }),
    Event.countDocuments({ status: "upcoming" }),
    Event.countDocuments({ status: "past" }),
    Project.countDocuments({ status: "Live" }),
    Contact.countDocuments({ read: false }),
  ]);

  res.json({
    success: true,
    stats: {
      members: { total: totalMembers, pending: pendingMembers, approved: approvedMembers },
      events: { upcoming: upcomingEvents, past: pastEvents },
      projects: { live: liveProjects },
      contacts: { unread: unreadContacts },
    },
  });
});

module.exports = router;
