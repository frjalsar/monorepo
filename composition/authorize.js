function makeAuthorize(pgPool, redisClient, logger) {
  const getToken = require('../lib/getToken')
  const makeGetUser = require('../userstore/get')
  const makeSetUser = require('../userstore/set')
  const makeSelectUser = require('../repo/users/select')
  const makeAuthorizationHandler = require('../lib/authorizationHandler')

  const getUser = makeGetUser(redisClient)
  const setUser = makeSetUser(redisClient)
  const selectUser = makeSelectUser(pgPool)

  return makeAuthorizationHandler(getToken, getUser, setUser, selectUser, logger)
}

module.exports = makeAuthorize