const router = require('express').Router()
const uid = require('uid-safe')
const login = require('./login')
const redis = require('../redis')

router.post('/', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  return login(username, password).then(user => {
    if (user) {
      uid(18).then(sid => {
        redis.set(sid, JSON.stringify(user))
        res.cookie('icelandathletics', sid, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        })
        res.json(user)
      })
    } else {
      res.status(401).send('Notendanafn eða lykilorð rangt')
    }
  })
})

module.exports = router
