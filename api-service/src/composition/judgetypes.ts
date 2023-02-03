import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectJudgeTypes } from '../repo/judgetypes/select'
import { makeUpdateJudgeType } from '../repo/judgetypes/update'
import { makeInsertJudgeType } from '../repo/judgetypes/insert'
import { makeJudgeTypesRouter } from '../routes/judgetypes'
import { selectJudgeTypes, updateJudgeType, insertJudgeType } from 'types/JudgeType'

export type makeJudgeTypes = (db: PoolClient) => IRouter

export function makeJudgeTypes(db) {

  const selectJudgeTypes:selectJudgeTypes = makeSelectJudgeTypes(db)
  const updateJudgeType:updateJudgeType = makeUpdateJudgeType(db)
  const insertJudgeType:insertJudgeType = makeInsertJudgeType(db)

  return makeJudgeTypesRouter(selectJudgeTypes, updateJudgeType, insertJudgeType)
}

