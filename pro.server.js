var express = require('express')
var app = express()
var config = require('./config/index.js')
var port = 9000
app.use(express.static('./dist'))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://' + config.dev.host +':' + port + '\n')
})