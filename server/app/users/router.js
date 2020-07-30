const express = require("express");
const router = express.Router();
const userProjectsController = require("../projects/controllers/projects");

router.get("/:userId/projects", userProjectsController.getUserProjects);

module.exports = router;