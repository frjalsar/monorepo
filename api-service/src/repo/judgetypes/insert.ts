import { PoolClient } from 'pg'
import { InsertJudgeType } from 'types/judgetype'

export type MakeInsertJudgeType = (db: PoolClient) => InsertJudgeType

export const makeInsertJudgeType: MakeInsertJudgeType = function (db) {
  return function insertJudgeType (judgeType, user) {
    const sql = `
      INSERT INTO judgetypes (
        name,
        stage,
        _userid,
        _enabled,
        _time
      )
      VALUES ($1, $2, $3, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      judgeType.name,
      judgeType.stage,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
