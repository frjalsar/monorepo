
function makeLogin (db, redis, isProduction) {
  const makeSelectUsers = require('../repo/users/select')
  const makeSetUser = require('../userstore/set')
  const makeLoginHandler = require('../lib/loginHandler')
  const makeLoginRouter = require('../routes/login')

  const selectUsers = makeSelectUsers(db)
  const setUser = makeSetUser(redis)
  const loginHandler = makeLoginHandler(selectUsers, setUser)

  return makeLoginRouter(loginHandler, isProduction)
}

module.exports = makeLogin
