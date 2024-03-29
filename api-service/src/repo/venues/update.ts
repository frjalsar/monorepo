import { PoolClient } from 'pg'
import { UpdateVenue } from 'types/venue'

export type MakeUpdateVenue = (db: PoolClient) => UpdateVenue

export const makeUpdateVenue: MakeUpdateVenue = function (db) {
  return function updateVenue (venue, user) {
    const sql = `
      UPDATE venues SET
        fullname = $1,
        indoor = $2,
        banked = $3,
        straightlanes = $4,
        ovallanes = $5,
        longTripleJump = $6,
        polevault = $7,
        hammerDiscus = $8,
        javelin = $9,
        shotPut = $10,
        material = $11,
        constructionYear = $12,
        renovationYear = $13,
        warmupTrack = $14,
        throwingField = $15,
        certification = $16,
        _userid = $17,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $18
      RETURNING id`

    const params = [
      venue.fullName,
      venue.indoor,
      venue.banked,
      venue.straightLanes,
      venue.ovalLanes,
      venue.longTripleJump,
      venue.polevault,
      venue.hammerDiscus,
      venue.javelin,
      venue.shotPut,
      venue.material,
      venue.constructionYear,
      venue.renovationYear,
      venue.warmupTrack,
      venue.throwingField,
      venue.certification,
      user.id,
      venue.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
