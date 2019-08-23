function makeInsertClub (db) {
  return function insertClub (club) {
    const sql = `
      INSERT INTO clubs (
        fullname,
        shortname,        
        abbreviation,
        regionid
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id`

    const params = [
      club.fullName,
      club.shortName,
      club.abbreviation,
      club.regionId
    ]

    return db.query(sql, params)
  }
}

module.exports = makeInsertClub
