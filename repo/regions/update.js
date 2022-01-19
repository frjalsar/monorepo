function makeUpdateRegion (db) {
  return function updateRegion (region, user) {
    const sql = `
      UPDATE regions SET        
        abbreviation = $1,
        fullname = $2,        
        modifiedby = $3,
        modifiedat = CURRENT_TIMESTAMP(3)
      WHERE
        id = $4`

    const params = [
      region.abbreviation,
      region.fullName,
      user.id,
      region.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeUpdateRegion
