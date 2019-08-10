const { compare } = require('bcryptjs')
const findUser = require('../users/find')

function login (username, password) {
  return findUser(username).then(user => {
    if (!user) {
      return undefined
    }

    return compare(password, user.password).then(success => {
      if (!success) {
        return undefined
      } else {
        return user
      }
    })
  })
}

module.exports = login
