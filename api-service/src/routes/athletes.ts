import { authorize } from '../lib/authorizeHandler'
import { IRouter, Router } from 'express'

import { SelectAthletes, EditAthlete, CreateAthlete } from 'types/athlete'

export type MakeAthleteRoute = (
  selectAthlete: SelectAthletes,
  editAthlete: EditAthlete,
  createAthlete: CreateAthlete
) => IRouter

export const makeAthleteRoute: MakeAthleteRoute = function (selectAthlete, editAthlete, createAthlete) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return selectAthlete(req.query, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    return selectAthlete({ id: req.params.id }, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  /*
  hasAccess
   - Notandi með sömu kennitölu og íþróttamður.
   - Notandi með clubId sama og er skráð sem current lið hjá íþróttamanni.
   - Notandi með regionId sama og er skráð sem current region hjá íþróttamanni.
   - Notandi með regionAbbreviation eða clubAbbreviation sama og eitthvert thorClub í membership.
  */
  router.put('/', authorize(['admin']), (req, res, next) => {
    return editAthlete(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return createAthlete(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

/*
function editAccess (db) {
  return async (req, res, next) => {
    const selectAthletes = makeSelectAthletes(db)
    if (req.user) {
      if (req.user.admin) {
        return next()
      }

      if (req.user.username === req.body.kt) {
        return next()
      }

      const athletes = await selectAthletes({ id: req.body.id })
      const foundMembership = athletes[0] && athletes[0].membership.find(m => {
        const foundClub = req.user.clubId && req.user.clubId === m.clubId
        const foundRegion = req.user.regionId && req.user.regionId === m.regionId
        const foundThorClub = req.user.clubId && req.user.clubAbbreviation === m.legacyClub
        const foundThorRegion = req.user.regionId && req.user.regionAbbreviation === m.legacyClub

        return foundClub || foundRegion || foundThorClub || foundThorRegion
      })

      if (foundMembership) {
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
