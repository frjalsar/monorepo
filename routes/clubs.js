const express = require('express')
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

  /*
  hasAccess
   - Notandi með clubId sama og er skráð sem current club.
   - Notandi með regionId sama og er skráð sem region hjá current club.
   - Notandi með regionAbbreviation eða clubAbbreviation sama og eitthvert thorClub í membership.
  */

  router.put('/', editAccess(db), (req, res, next) => {
    const updateClub = makeUpdateClub(db)

    return updateClub(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', createAccess(), (req, res, next) => {
    const insertClub = makeInsertClub(db)

    return insertClub(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

function editAccess (db) {
  return async (req, res, next) => {
    const selectClubs = makeSelectClubs(db)
    if (req.user) {
      if (req.user.admin) {
        return next()
      }

      if (req.user.clubId === req.body.id) {
        return next()
      }

      const clubs = await selectClubs({ id: req.body.id }).then(mapClubs)
      const clubRegionId = clubs[0] && clubs[0].regionId

      if (req.user.regionId === clubRegionId) {
        return next()
      }
    }

    return res.sendStatus(401)
  }
}

function createAccess () {
  return (req, res, next) => {
    if (req.user && req.user.admin) {
      return next()
    }

    return res.sendStatus(401)
  }
}

module.exports = makeClubRoute
