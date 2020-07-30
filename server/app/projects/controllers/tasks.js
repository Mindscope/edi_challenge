let mongoose = require("mongoose");
const Project = require("../models/Project");

exports.allTasks = async (req, res) => {
  try {
    const id = req.params.projectId;
    const project = await Project.findById(id);
    res.status(200).json(project.tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addTask = async (req, res) => {
  try {
    const id = req.params.projectId;
    const project = await Project.findById(id);
    project.tasks.push({description: req.body.description})
    await project.save();
    res.status(200).json(project.tasks);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.projectId;
    const project = await Project.findById(id);
    const task = project.tasks.id(req.params.taskId);
    const taskId = task._id;
    task.remove();
    await project.save();
    res.status(200).json(project.tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.projectId;
    const project = await Project.findById(id);
    const task = project.tasks.id(req.params.taskId);
    let data = req.body;
    
    // If the is_complete is true and was changed we need to set the `finished_at` date.
    if (data.is_complete && !task.is_complete) data.finished_at = Date.now();

    task.set(data);
    await project.save();
    
    res.status(200).json(project.tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};
