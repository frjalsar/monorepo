const redis = require('../redis')

function authorize () {
  return (req, res, next) => {
    if (req.cookies.FRI_API) {
      const value = req.cookies.FRI_API
      redis.get(value, (err, reply) => {
        if (!err && reply) {
          req.user = JSON.parse(reply)
          next()
        } else {
          res.sendStatus(401)
        }
      })
    } else {
      res.sendStatus(401)
    }
  }
}

module.exports = authorize
