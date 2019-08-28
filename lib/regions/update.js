function makeUpdateRegion (db) {
  return function updateRegion (region, user) {
    const sql = `
      UPDATE regions SET        
        abbreviation = $1,
        fullname = $2,
        verifieduserid = $3,
        verifieddate = $4
      WHERE
        id = $5`

    const params = [
      region.abbreviation,
      region.fullName,
      region.verified ? ((region.verification && region.verification.userId) || user.id) : null,
      region.verified ? ((region.verification && region.verification.date) || new Date()) : null,
      region.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeUpdateRegion
