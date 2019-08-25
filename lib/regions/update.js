function makeUpdateRegion (db) {
  return function updateRegion (region) {
    const sql = `
      UPDATE regions SET        
        abbreviation = $1,
        fullname = $2      
      WHERE
        id = $3`

    const params = [
      region.abbreviation,
      region.fullname,
      region.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeUpdateRegion
