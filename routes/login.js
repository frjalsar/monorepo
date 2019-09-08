const cleanKennitala = require('kennitala-utility').clean
const express = require('express')
const makeLogin = require('../auth/login')

function makeLoginRoute (db, redisClient) {
  const router = express.Router()

  router.post('/', (req, res, next) => {
    const login = makeLogin(db, redisClient)
    const username = cleanKennitala(req.body.username)
    const password = req.body.password

    return login(username, password)
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.status(401).send('Notendanafn eða lykilorð rangt')
        }
      })
      .catch(next)
  })

  return router
}

module.exports = makeLoginRoute
