import { makeSelectUsers } from '../repo/users/select'
import { makeSetUser } from '../userstore/set'
import { makeLoginHandler } from '../lib/loginHandler'
const makeLoginRouter = require('../routes/login')

function makeLogin (db, redis, isProduction) {
  const selectUsers = makeSelectUsers(db)
  const setUser = makeSetUser(redis)
  const loginHandler = makeLoginHandler(selectUsers, setUser)

  return makeLoginRouter(loginHandler, isProduction)
}

module.exports = makeLogin
