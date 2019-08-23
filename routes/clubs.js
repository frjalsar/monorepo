const express = require('express')
const makeSelectClubs = require('../lib/clubs/select')
const makeUpdateClub = require('../lib/clubs/update')
const makeInsertClub = require('../lib/clubs/insert')
const groupRegion = require('../lib/clubs/group')

function makeClubRoute (db) {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    const selectClubs = makeSelectClubs(db)

    selectClubs()
      .then(groupRegion)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    const selectClubs = makeSelectClubs(db)

    selectClubs({ id: req.params.id })
      .then(groupRegion)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    const updateClub = makeUpdateClub(db)

    updateClub(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    const insertClub = makeInsertClub(db)

    insertClub(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeClubRoute
