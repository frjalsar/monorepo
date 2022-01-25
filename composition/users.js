function makeUsers (db) {
  const makeSelectUsers = require('../repo/users/select')
  const makeUpdateUser = require('../repo/users/update')
  const makeInsertUser = require('../repo/users/insert')
  const makeUsersRouter = require('../routes/users')

  const selectUsers = makeSelectUsers(db)
  const updateUser = makeUpdateUser(db)
  const insertUser = makeInsertUser(db)

  return makeUsersRouter(selectUsers, updateUser, insertUser)
}

module.exports = makeUsers
