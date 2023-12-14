const db = require('../../data/db-config')

  // resolves to an ARRAY with all users, each user having { user_id, username }
function find() {
  return db('users')
}

  // resolves to an ARRAY with all users that match the filter condition
async function findBy(field, value) {
  const user = await db('users').where(field.toString(), '=', value.toString())
  return user[0]
}

  // resolves to the user { user_id, username } with the given user_id
async function findById(user_id) {
  const user = await db('users').where('user_id', '=', user_id)
  return user[0]
}

  // resolves to the newly inserted user { user_id, username }
async function add(user) {
  const id = await db('users').insert(user)
  const newUser = findById(id[0])

  return newUser
}

module.exports = {
  find,
  findBy,
  findById,
  add,
}