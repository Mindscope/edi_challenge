var express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const config = require('./config')

// Configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.mongodb.connectionstring, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

var app = express()

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Registering cors
app.use(cors());app.set('views', __dirname)

//app.use('/api', require('./customers/router'))
app.use('/api/projects', require('./app/projects/router'))
app.use('/api/auth', require('./app/auth/router'))

module.exports = app