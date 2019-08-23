const { compare } = require('bcryptjs')
const uid = require('uid-safe')
const makeSelectUsers = require('../lib/users/select')

function makeLogin (pgPool, redisClient) {
  return function login (username, password) {
    const selectUsers = makeSelectUsers(pgPool)

    return selectUsers(username).then(user => {
      if (!user) {
        return undefined
      }

      return compare(password, user.password).then(success => {
        if (!success) {
          return undefined
        } else {
          return uid(18).then(token => {
            user.password = undefined
            redisClient.set(token, JSON.stringify(user), 'EX', 604800)
            user.token = token
            return user
          })
        }
      })
    })
  }
}

module.exports = makeLogin
