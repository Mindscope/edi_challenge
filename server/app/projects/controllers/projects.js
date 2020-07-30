let mongoose = require("mongoose");
const Project = require("../models/Project");

exports.allProjects = async (req, res) => {
  try {
    let projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      author: req.body.author      
    });
    let newProject = await project.save();
    res.status(200).json({ data: newProject });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const id = req.params.projectId;
    let result = await Project.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateProject = async (req, res) => {
  try {
    const id = req.params.projectId;
    let result = await Project.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    let projects = await Project.find({author: req.params.userId});
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }  
}