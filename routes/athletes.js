const express = require('express')
const group = require('../lib/athletes/group')
const makeSelectAthletes = require('../lib/athletes/select')
const makeCreateAthlete = require('../lib/athletes/create')
const makeChangeAthlete = require('../lib/athletes/change')

function makeAthleteRoute (db) {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    const selectAthlete = makeSelectAthletes(db)

    selectAthlete(req.query)
      .then(group)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    const selectAthlete = makeSelectAthletes(db)

    selectAthlete({ id: req.params.id })
      .then(group)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    const createAthlete = makeCreateAthlete(db)

    createAthlete(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    const changeAthlete = makeChangeAthlete(db)

    changeAthlete(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeAthleteRoute
