const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')

  // If the user does not have a session saved in the server:
  //   status 401 message: "You shall not pass!"
function restricted(req, res, next) {
  if (req.session && req.session.user_id) next()
  else res.status(401).json({message: "You shall not pass!"})
}

  // If the username in req.body already exists in the database:
  //   status 422 message: "Username taken"
async function checkUsernameFree(req, res, next) {
  const existing = await Users.findBy('username', req.body.username)
  if (existing) res.status(422).json({message: "Username taken"})
  else next()
}

  // If the username in req.body does NOT exist in the database:
  //   status 401 message: "Invalid credentials"
async function checkUsernameExists(req, res, next) {
  const user = await Users.findBy('username', req.body.username)
  const credentials = req.body

  if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
    return res.status(401).json({message: "Invalid credentials"})
  }
  else {
    req.session.user_id = user.user_id
    req.session.name = user.username
    next()
  }
}

  // If password is missing from req.body, or if it's 3 chars or shorter:
  //   status 422 message: "Password must be longer than 3 chars"
function checkPasswordLength(req, res, next) {
  const { password } = req.body
  if (!password || password.length < 4) res.status(422).json({message: "Password must be longer than 3 chars"})
  else next()
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
}