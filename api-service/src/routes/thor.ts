import { Router, IRouter } from 'express'

import { SelectThorEvents, SelectThorAchievements, SelectMissingRunners, UpdateMissingRunner, SelectCompetitor } from 'types/thor'

export type MakeThorRoute = (
  selectThorEvents: SelectThorEvents,
  selectThorAchievements: SelectThorAchievements,
  selectMissingRunners: SelectMissingRunners,
  updateMissingRunner: UpdateMissingRunner,
  selectCompetitor: SelectCompetitor
) => IRouter

export const makeThorRoute: MakeThorRoute = function (selectThorEvents, selectThorAchievements, selectMissingRunners, updateMissingRunner, selectCompetitor) {
  const router = Router()

  router.get('/events', (req, res, next) => {
    selectThorEvents(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/achievements', (req, res, next) => {
    selectThorAchievements(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/missingrunners', (req, res, next) => {
    selectMissingRunners(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/competitor/:kt', (req, res, next) => {
    selectCompetitor({ kt: req.params.kt })
      .then(res.json.bind(res))
      .catch(next)
  })
  router.put('/missingrunners', (req, res, next) => {
    updateMissingRunner(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}
