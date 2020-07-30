const express = require("express");
const router = express.Router();
const projectController = require("./controllers/projects");
const taskController = require("./controllers/tasks");

// Projects
router.get("/", projectController.allProjects);
router.post("/", projectController.addProject);
router.delete("/:projectId", projectController.deleteProject);
router.put("/:projectId", projectController.updateProject);

// Tasks
router.get("/:projectId/tasks", taskController.allTasks);
router.post("/:projectId/tasks", taskController.addTask);
router.delete("/:projectId/tasks/:taskId", taskController.deleteTask);
router.put("/:projectId/tasks/:taskId", taskController.updateTask);

module.exports = router;