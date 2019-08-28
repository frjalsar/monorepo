const express = require('express')
const hasAccess = require('../auth/hasAccess')
const makeSelectClubs = require('../lib/clubs/select')
const makeUpdateClub = require('../lib/clubs/update')
const makeInsertClub = require('../lib/clubs/insert')
const mapClubs = require('../lib/clubs/map')

function makeClubRoute (db) {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    const selectClubs = makeSelectClubs(db)

    selectClubs()
      .then(mapClubs)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    const selectClubs = makeSelectClubs(db)

    selectClubs({ id: req.params.id })
      .then(mapClubs)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', hasAccess('clubId'), (req, res, next) => {
    const updateClub = makeUpdateClub(db)

    updateClub(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', hasAccess('clubId'), (req, res, next) => {
    const insertClub = makeInsertClub(db)

    insertClub(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeClubRoute
