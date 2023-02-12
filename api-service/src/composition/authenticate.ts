import { getToken } from '../lib/getToken'
import { makeGetUser } from '../userstore/get'
import { makeSetUser } from '../userstore/set'
import { makeSelectUsers } from '../repo/users/select'
import { makeAuthenticationHandler } from '../lib/authenticationHandler'
export function makeAuthenticate (pgPool, redisClient, logger) {
  const getUser = makeGetUser(redisClient)
  const setUser = makeSetUser(redisClient)
  const selectUser = makeSelectUsers(pgPool)

  return makeAuthenticationHandler(getToken, getUser, setUser, selectUser, logger)
}
