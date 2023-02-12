import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectJudgeTypes } from '../repo/judgetypes/select'
import { makeUpdateJudgeType } from '../repo/judgetypes/update'
import { makeInsertJudgeType } from '../repo/judgetypes/insert'
import { makeJudgeTypesRouter } from '../routes/judgetypes'
import { SelectJudgeTypes, UpdateJudgeType, InsertJudgeType } from 'types/judgetype'

export type MakeJudgeTypes = (db: PoolClient) => IRouter

export function makeJudgeTypes (db) {
  const selectJudgeTypes:SelectJudgeTypes = makeSelectJudgeTypes(db)
  const updateJudgeType:UpdateJudgeType = makeUpdateJudgeType(db)
  const insertJudgeType:InsertJudgeType = makeInsertJudgeType(db)

  return makeJudgeTypesRouter(selectJudgeTypes, updateJudgeType, insertJudgeType)
}
