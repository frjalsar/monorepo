import { PoolClient } from 'pg'
import { UpdateClub } from 'types/club'

export type MakeUpdateClub = (db: PoolClient) => UpdateClub

export const makeUpdateClub: MakeUpdateClub = function (db) {
  return function updateClub (club, user) {
    const sql = `
      UPDATE clubs SET
        fullname = $1,
        shortname = $2,
        abbreviation = $3,
        thorid = $4,
        regionid = $5,
        _userid = $6
      WHERE
        id = $7
      RETURNING id`

    const params = [
      club.fullName,
      club.shortName,
      club.abbreviation,
      club.thorId,
      club.regionId,
      user.id,
      club.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
