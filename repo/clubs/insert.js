function makeInsertClub (db) {
  return function insertClub (club, user) {
    const sql = `
      INSERT INTO clubs (
        fullname,
        shortname,
        abbreviation,
        regionid,
        _userid,
      )
      VALUES ($1, $2, $3, $4, $5)
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
