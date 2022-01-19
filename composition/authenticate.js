function makeAuthenticate(pgPool, redisClient, logger) {
  const getToken = require('../lib/getToken')
  const makeGetUser = require('../userstore/get')
  const makeSetUser = require('../userstore/set')
  const makeSelectUser = require('../repo/users/select')
  const makeAuthenticationHandler = require('../lib/authenticationHandler')

  const getUser = makeGetUser(redisClient)
  const setUser = makeSetUser(redisClient)
  const selectUser = makeSelectUser(pgPool)

  return makeAuthenticationHandler(getToken, getUser, setUser, selectUser, logger)
}

module.exports = makeAuthenticate