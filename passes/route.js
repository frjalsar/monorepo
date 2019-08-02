const bodyParser = require('body-parser')
const router = require('express').Router()
const pool = require('../db')

const createSelect = require('./select')
const createSelectQr = require('./selectQr')
const createInsert = require('./insert')

router.get('/:athleteId', (req, res) => {
  const select = createSelect(pool)

  return select(req.params.athleteId).then(pass => {
    res.json(pass)
  })
})

router.get('/:athleteId/qr', bodyParser.raw(), (req, res) => {
  res.set('Content-Type', 'image/png')
  const select = createSelectQr(pool)

  return select(req.params.athleteId).then(pass => {
    res.send(pass)
  })
})

router.post('/', (req, res) => {
  const insert = createInsert(pool)

  return insert(req.body.athleteId).then(passId => {
    res.json({ passId })
  })
})

module.exports = router
