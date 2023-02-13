import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectJudges } from '../repo/judges/select'
import { makeUpdateJudge } from '../repo/judges/update'
import { makeInsertJudge } from '../repo/judges/insert'
import { makeJudgesRouter } from '../routes/judges'
import { SelectJudges, UpdateJudge, InsertJudge } from 'types/judge'

export type MakeJudges = (db: PoolClient) => IRouter

export function makeJudges (db) {
  const selectJudges: SelectJudges = makeSelectJudges(db)
  const updateJudge: UpdateJudge = makeUpdateJudge(db)
  const insertJudge: InsertJudge = makeInsertJudge(db)

  return makeJudgesRouter(selectJudges, updateJudge, insertJudge)
}
