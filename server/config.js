var config = module.exports
var PRODUCTION = process.env.NODE_ENV === 'production'

config.express = {
  port: process.env.SERVER_PORT || 3000,
  ip: '0.0.0.0'
}

config.mongodb = {
  port: process.env.MONGODB_PORT || 27017,
  host: process.env.MONGODB_HOST || 'localhost',
  connectionstring: process.env.DATABASE_CONNECTIONSTRING || "",
}

if (PRODUCTION) {
  config.express.ip = '0.0.0.0'
}