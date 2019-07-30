function getAll (db) {
  return function () {
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

    return db
      .query(sql, [])
      .then(res => res.rows)
  }
}

module.exports = getAll
