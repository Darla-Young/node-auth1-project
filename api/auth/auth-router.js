const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require('./auth-middleware')

const { add, findById } = require('../users/users-model')
const express = require('express')
const router = express.Router()

router.post('/register', checkUsernameFree, checkPasswordLength, (req, res, next) => {
  add(req.body)
    .then(user => res.json(user))
    .catch(next)
})

router.post('/login', checkUsernameExists, (req, res, next) => {
  findById(req.params.id)
    .then(user => res.json({message: `Welcome ${user.username}!`}))
    .catch(next)
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) res.json({message: "no session"})
      else res.json({message: "logged out"})
    })
  }
})

module.exports = router