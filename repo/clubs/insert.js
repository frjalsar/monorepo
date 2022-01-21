function makeInsertClub (db) {
  return function insertClub (club, user) {
    const sql = `
      INSERT INTO clubs (
        fullname,
        shortname,
        abbreviation,
        regionid,
        _userid,
        _enabled
        _time
      )
      VALUES ($1, $2, $3, $4, $5, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      club.fullName,
      club.shortName,
      club.abbreviation,
      club.regionId,
      user.id
    ]

    return db.query(sql, params)
  }
}

module.exports = makeInsertClub
