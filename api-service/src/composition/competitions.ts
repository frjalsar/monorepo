import { makeSelectCompetitions } from '../repo/competitions/select'
import { makeInsertCompetition } from '../repo/competitions/insert'
import { makeCompetitionsRouter } from '../routes/competitions'

import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { InsertCompetition, SelectCompetitions } from 'types/competition'

export type MakeCompetitions = (db: PoolClient) => IRouter

export function makeCompetitions (db) {
  const selectCompetitions: SelectCompetitions = makeSelectCompetitions(db)
  const insertCompetition: InsertCompetition = makeInsertCompetition(db)

  return makeCompetitionsRouter(selectCompetitions, insertCompetition)
}
