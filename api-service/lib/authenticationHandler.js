function makeAuthenticationHandler (getToken, getUser, setUser, selectUser, logger) {
  return function authenticate () {
    return (req, res, next) => {
      const token = getToken(req.headers)
      if (token) {
        return getUser(token)
          .then(reply => {
            if (!reply) {
              return selectUser({ token }).then(users => {
                if (users.length === 1) {
                  req.user = users[0]
                  setUser(users[0])
                  return next()
                } else {
                  return res.sendStatus(401)
                }
              })
            }

            req.user = JSON.parse(reply)
            return next()
          })
          .catch(err => {
            logger.error('Error authenticating')
            logger.error(err)
            return res.sendStatus(401)
          })
      } else {
        return res.sendStatus(401)
      }
    }
  }
}

module.exports = makeAuthenticationHandler
