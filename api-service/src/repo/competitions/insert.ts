import { toTuple, flatten } from 'pg-parameterize'
import { PoolClient } from 'pg'
import { InsertCompetition } from 'types/competition'

export type MakeInsertCompetition = (db: PoolClient) => InsertCompetition

export const makeInsertCompetition: MakeInsertCompetition = function (db) {
  return function insertCompetition (competition) {
    if ((competition.length) === 0) {
      return Promise.resolve()
    }

    const arr = competition.map(obj => [
      obj.meetId,
      obj.eventId,
      obj.ageFrom,
      obj.ageTo,
      obj.gender,
      obj.indoor
    ])

    const sql = `
    INSERT INTO competitions (
      meetid,
      eventid,
      agefrom,
      ageto,
      gender,
      indoor        
    )
    VALUES ${toTuple(arr, true)}`

    const params = flatten(arr)

    return db
      .query(sql, params)
      .then(() => competition[0].meetId)
  }
}
