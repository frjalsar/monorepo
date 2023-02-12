import { PoolClient } from 'pg'
import { SelectMeetAttachment } from 'types/meets'

export type MakeSelectMeetAttachment=(db:PoolClient)=>SelectMeetAttachment

export const makeSelectMeetAttachment:MakeSelectMeetAttachment = function (db) {
  return function selectMeetAttachment (meetId) {
    const params = [meetId]
    const sql = `
      SELECT
        m.attachment        
      FROM
        meets m      
      WHERE m.id = $1`

    return db
      .query(sql, params)
      .then(res => {
        if (res.rows.length === 1 && res.rows[0].attachment) {
          return res.rows[0].attachment
        }

        return undefined
      })
  }
}
