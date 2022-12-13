const { compare } = require('bcryptjs')

function makeLoginHandler (selectUsers, setUser) {
  return function login (username, password) {
    return selectUsers({ username }).then(users => {
      const user = users.length === 1 ? users[0] : undefined

      if (!user) {
        return undefined
      }

      return compare(password, user.password).then(success => {
        if (!success) {
          return undefined
        } else {
          return setUser(user)
        }
      })
    })
  }
}

module.exports = makeLoginHandler
