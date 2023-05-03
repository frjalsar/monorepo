export function makeAuthenticationHandler (getToken, getUser, setUser, selectUser, logger) {
  return function authenticate () {
    return (req, res, next) => {
      logger.info('authentication handler')
      const token = getToken(req.headers)
      if (token) {
        return getUser(token)
          .then(reply => {
            logger.info('got user', reply)
            if (!reply) {
              return selectUser({ token }).then(users => {
                logger.info('select user from db')
                if (users.length === 1) {
                  req.user = users[0]
                  setUser(users[0])
                  return next()
                } else {
                  logger.info('found no user in store nor db')
                  return res.sendStatus(401)
                }
              })
            }
            logger.info('continue')
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
