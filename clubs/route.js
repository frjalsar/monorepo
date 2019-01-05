const router = require('express').Router()
const getAll = require('./getAll')

router.get('/', (_, res) => {
  return getAll().then(list => {
    res.json(list)
  })
})

module.exports = router
