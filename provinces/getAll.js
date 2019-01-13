function getAll (db) {
  return function () {
    const sql = `
      SELECT
        p.id,
        p.abbreviation,
        p.fullname
      FROM
        provinces p
      ORDER BY
        p.fullname asc
    `

    return db
      .query(sql, [])
      .then(res => res.rows)
  }
}

module.exports = getAll
