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
        inactive = $5,
        regionid = $6,
        _userid = $7
      WHERE
        id = $8
      RETURNING id`

    const params = [
      club.fullName,
      club.shortName,
      club.abbreviation,
      club.thorId,
      club.inactive,
      club.regionId,
      user.id,
      club.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
