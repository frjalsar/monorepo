const router = require('express').Router()
const pool = require('../db')
const createGetAllProvinces = require('./getAll')

router.get('/', (_, res) => {
  const getAll = createGetAllProvinces(pool)
  return getAll().then(list => {
    res.json(list)
  })
})

module.exports = router
