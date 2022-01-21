function makeInsertRegion (db) {
  return function insertRegion (region, user) {
    const sql = `
      INSERT INTO regions (
        fullname,
        abbreviation,
        _userid,
        _enabled,
        _time
      )
      VALUES ($1, $2, $3, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      region.fullName,
      region.abbreviation,
      user.id
    ]

    return db.query(sql, params)
  }
}

module.exports = makeInsertRegion
