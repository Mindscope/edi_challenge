const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username});
    user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) res.status(403).json({err: "Not allowed"})
        else res.status(200).json({id: user._id, username: user.username}); 
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.register = async (req, res) => {
    const username = req.body.username;
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    if (password1 != password2) {
        res.status(500).json({error: "Passwords do not match"})
    }

    try {
        const user = new User({
            username: username,
            password: password1
        });
        const newUser = await user.save();
        res.status(200).json({ data: newUser });
    } catch (err) {
        res.status(500).json({error: err});
    }
};
