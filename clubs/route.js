const router = require('express').Router()
const pool = require('../db')
const createGetAllClubs = require('./getAll')
const createSelectClub = require('./select')
const createUpdate = require('./update')
const createInsert = require('./insert')
const groupProvince = require('./group')

router.get('/', (_, res) => {
  const getAll = createGetAllClubs(pool)
  return getAll().then(list => {
    const groupedList = groupProvince(list)
    res.json(groupedList)
  })
})

router.get('/:id', (req, res) => {
  const select = createSelectClub(pool)
  return select(req.params.id).then(list => {
    const groupedList = groupProvince(list)
    res.json(groupedList)
  })
})

router.put('/', (req, res) => {
  const update = createUpdate(pool)
  return update(req.body).then(id => {
    res.json({ id })
  })
})

router.post('/', (req, res) => {
  const insert = createInsert(pool)
  return insert(req.body).then(id => {
    res.json({ id })
  })
})

module.exports = router
