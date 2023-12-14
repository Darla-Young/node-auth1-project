const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require('./auth-middleware')

const { add, findById } = require('../users/users-model')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.post('/register', checkUsernameFree, checkPasswordLength, (req, res, next) => {
  const credentials = req.body
  const hash = bcrypt.hashSync(credentials.password, 12)
  credentials.password = hash

  add(credentials)
    .then(user => res.json(user))
    .catch(next)
})

router.post('/login', checkUsernameExists, (req, res, next) => {
  findById(req.session.user_id)
    .then(user => {
      res.json({message: `Welcome ${user.username}!`})
    })
    .catch(next)
})

router.get('/logout', (req, res) => {
  if (req.session.user_id) req.session.destroy(() => res.json({message: "logged out"}))
  else res.json({message: "no session"})
})

module.exports = router