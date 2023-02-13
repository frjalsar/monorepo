import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { CreateAthlete, EditAthlete, SelectAthletes } from 'types/athlete'
import { makeSelectAthletes } from '../repo/athletes/select'
import { makeEditAthlete } from '../repo/athletes/edit'
import { makeEditOrCreateAthlete } from '../repo/athletes/create'
import { makeUpdateCompetitor } from '../repo/thor/updateCompetitor'
import { makeInsertCompetitor } from '../repo/thor/insertCompetitor'
import { makeAthleteRoute } from '../routes/athletes'

export type MakeAthletes = (db: PoolClient) => IRouter

export function makeAthletes (pgPool, sqlConnection) {
  // THOR - Remove in future
  const updateCompetitor = makeUpdateCompetitor(sqlConnection)
  const insertCompetitor = makeInsertCompetitor()

  const selectAthletes: SelectAthletes = makeSelectAthletes(pgPool)
  const editAthlete: EditAthlete = makeEditAthlete(pgPool, updateCompetitor)
  const createAthlete: CreateAthlete = makeEditOrCreateAthlete(pgPool, insertCompetitor)

  return makeAthleteRoute(selectAthletes, editAthlete, createAthlete)
}
