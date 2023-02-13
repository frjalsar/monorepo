import { makeSelectPasses } from 'repo/passes/select'
import { makeInsertPass } from 'repo/passes/insert'
import { PoolClient } from 'pg'
import { IRouter, Router } from 'express'
import { SelectPasses, InsertPass } from 'types/pass'

export type MakePassesRoute = (db: PoolClient) => IRouter

export const makePassesRoute: MakePassesRoute = function (db) {
  const router = Router()

  router.get('/:athleteId', (req, res, next) => {
    const selectPasses: SelectPasses = makeSelectPasses(db)

    return selectPasses(req.params)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    const insertPass: InsertPass = makeInsertPass(db)

    return insertPass(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}
