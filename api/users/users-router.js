const { restricted } = require('../auth/auth-middleware')
const { find } = require('./users-model')
const express = require('express')
const router = express.Router()

router.get('/', restricted, (req, res, next) => {
  find()
  .then(arr => res.json(arr))
  .catch(next)
})

module.exports = router