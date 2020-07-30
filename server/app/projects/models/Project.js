let mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  description: {type: String, required: true}, 
  created_at: {type: Date, default: Date.now()},
  is_complete: {type: Boolean, default: false}, 
  finished_at: {type: Date}
});

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [taskSchema]
});
var Project = mongoose.model("Project", projectSchema);
module.exports = Project;