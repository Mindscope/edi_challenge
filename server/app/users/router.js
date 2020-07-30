var router = require('express').Router()
var needUser = require('./need-user')

function signIn (req, res) {
  console.log("Sign in...");
}

function profile (req, res) {
  res.render('users/profile')
}

router.post('/users/sign-in', signIn)
router.get('/users/profile', needUser, profile)

module.exports = router