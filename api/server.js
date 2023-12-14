const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const UsersRouter = require('./users/users-router')
const AuthRouter = require('./auth/auth-router')
const session = require('express-session')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(session({
  name: 'chocolatechip',
  secret: 'Only FOOLS are positive!',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    secure: false, // true for production - only sends cookies over secured network
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
}))

server.use('/api/users', UsersRouter)
server.use('/api/auth', AuthRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
