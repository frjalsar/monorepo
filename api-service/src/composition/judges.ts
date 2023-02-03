import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectJudges } from '../repo/judges/select'
import { makeUpdateJudge } from '../repo/judges/update'
import { makeInsertJudge } from '../repo/judges/insert'
import { makeJudgesRouter } from '../routes/judges'
import { selectJudges, updateJudge, insertJudge } from 'types/judges'

export type makeJudges = (db: PoolClient) => IRouter

export function makeJudges(db) {

  const selectJudges:selectJudges = makeSelectJudges(db)
  const updateJudge:updateJudge = makeUpdateJudge(db)
  const insertJudge:insertJudge = makeInsertJudge(db)

  return makeJudgesRouter(selectJudges, updateJudge, insertJudge)
}
