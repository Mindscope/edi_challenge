let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }  
});
var User = mongoose.model("User", userSchema);
module.exports = User;