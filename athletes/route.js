const router = require('express').Router()
const group = require('./group')
const findAthlete = require('./find')
const selectAthlete = require('./select')

router.get('/', (req, res) => {
  return findAthlete(req.query.search).then(list => {
    const groupedList = group(list)
    res.json(groupedList)
  })
})

router.get('/:id', (req, res) => {
  return selectAthlete(req.params.id).then(list => {
    const groupedList = group(list)
    res.json(groupedList)
  })
})

module.exports = router
