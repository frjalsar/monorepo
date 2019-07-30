const router = require('express').Router()
const pool = require('../db')
const createGetAllRegions = require('./getAll')

router.get('/', (_, res) => {
  const getAll = createGetAllRegions(pool)
  return getAll().then(list => {
    res.json(list)
  })
})

module.exports = router
