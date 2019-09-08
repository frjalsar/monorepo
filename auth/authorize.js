const parseCookie = require('cookie').parse

function makeAuthorize (redisClient) {
  return function setUser () {
    return (req, res, next) => {
      let token
      if (req.headers.cookie) {
        token = parseCookie(req.headers.cookie).FRI_API_TOKEN
      }

      if (req.headers.authorization) {
        const parts = req.headers.authorization.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1]
        }
      }

      if (token) {
        redisClient.get(token, (err, reply) => {
          if (!err && reply) {
            req.user = JSON.parse(reply)
            return next()
          }
        })
      } else {
        return next()
      }
    }
  }
}

module.exports = makeAuthorize
