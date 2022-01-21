function makeUpdateRegion (db) {
  return function updateRegion (region, user) {
    const sql = `
      UPDATE regions SET
        fullname = $1,
        abbreviation = $2,
        _userid = $3,
        _enabled = true
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $4`

    const params = [
      region.fullName,
      region.abbreviation,
      user.id,
      region.id
    ]

    return db
      .query(sql, params)
      .then(res => mapRegions(res.rows))
  }
}

module.exports = makeUpdateRegion
