const express = require('express');
const server = express();
const configureMiddleware = require('./middleware');
const cohorts = require('./routes/cohorts-router');
const students = require('./routes/students-router');

configureMiddleware(server);

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to Lambda's Database!</h2>`)
  });  

server.use("/api/cohorts", cohorts);
server.use("/api/students", students);

module.exports = server;