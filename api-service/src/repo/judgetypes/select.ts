import { PoolClient } from 'pg'
import { SelectJudgeTypes} from 'types/judgetype'
import { mapJudgeTypes } from './map'


export type MakeSelectJudgeTypes = (db: PoolClient) => SelectJudgeTypes

export const makeSelectJudgeTypes:MakeSelectJudgeTypes = function(db) {
  return function selectJudgeTypes() {
    const sql = `
      SELECT
        jt.id,
        jt.name,
        jt.stage
      FROM
        judgetypes jt
      ORDER BY
        jt.stage ASC,
        jt.name ASC`

    return db
      .query(sql)
      .then(res => res.rows.map(mapJudgeTypes))
  }
}

