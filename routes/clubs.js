const { Router } = require('express')
const authorize = require('../lib/authorizeHandler')

function makeClubRoute (selectClubs, updateClub, insertClub) {
  const router = Router()

  router.get('/', (req, res, next) => {
    selectClubs()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    selectClubs({ id: req.params.id })
      .then(res.json.bind(res))
      .catch(next)
  })

  /*
  hasAccess
   - Notandi með clubId sama og er skráð sem current club.
   - Notandi með regionId sama og er skráð sem region hjá current club.
   - Notandi með regionAbbreviation eða clubAbbreviation sama og eitthvert thorClub í membership.
  */

  router.put('/', authorize(['admin']), (req, res, next) => {        
    return updateClub(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertClub(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

/*
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
*/

module.exports = makeClubRoute
