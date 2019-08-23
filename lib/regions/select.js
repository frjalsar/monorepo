function makeSelectRegions (db) {
  return function selectRegions () {
    const sql = `
      SELECT
        r.id,
        r.abbreviation,
        r.fullname
      FROM
        regions r
      ORDER BY
        r.fullname asc
    `
    const params = []

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectRegions
