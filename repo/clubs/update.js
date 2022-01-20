function makeUpdateClub (db) {
  return function updateClub (club, user) {
    const sql = `
      UPDATE clubs SET
        fullname = $1,
        shortname = $2,
        abbreviation = $3,
        regionid = $4,
        _userid = $5
      WHERE
        id = $6
      RETURNING id`

    const params = [
      club.fullName,
      club.shortName,
      club.abbreviation,
      club.regionId,
      user.id,
      club.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateClub
