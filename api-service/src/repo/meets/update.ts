import { PoolClient } from 'pg'
import { UpdateMeet } from 'types/meets'

export type MakeUpdateMeet=(db:PoolClient)=>UpdateMeet
export const makeUpdateMeet:MakeUpdateMeet=function(db) {
  return function updateMeet(meet, user) {
    const sql = `
      UPDATE meets SET
        name = $1,
        organizername = $2,
        organizerkt = $3,
        contactname = $4,
        contactemail = $5,
        contactphone = $6,
        location = $7,
        venueid = $8,
        judgeid = $9,
        -- startdate = $10,
        -- enddate = $11,
        status = $10,
        _userid = $11,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $12
      RETURNING id`

    const params = [
      meet.name,
      meet.organizerName,
      meet.organizerKt,
      meet.contactName,
      meet.contactEmail,
      meet.contactPhone,
      meet.location,
      meet.venueId,
      meet.judgeId,
      // meet.startDate,
      // meet.endDate,
      meet.status,
      user.id,
      meet.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
