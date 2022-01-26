function makeUsers (db, redis) {
  const makeSelectUsers = require('../repo/users/select')
  const makeUpdateUser = require('../repo/users/update')
  const makeInsertUser = require('../repo/users/insert')
  const makeCreateUser = require('../repo/users/create')
  const makeSetUser = require('../userstore/set')
  const makeUsersRouter = require('../routes/users')  

  const selectUsers = makeSelectUsers(db)
  const updateUser = makeUpdateUser(db)
  const insertUser = makeInsertUser(db)
  const setUser = makeSetUser(redis)

  const createUser = makeCreateUser(insertUser, selectUsers, setUser)

  return makeUsersRouter(selectUsers, updateUser, createUser)
}

module.exports = makeUsers
