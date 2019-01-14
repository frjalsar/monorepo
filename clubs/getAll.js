function getAll (db) {
  return function () {
    const sql = `
      SELECT
        c.id,
        c.fullname,
        c.shortname,
        c.abbreviation,
        p.id provinceid,
        p.fullname provincename,
        p.abbreviation provinceabbr
      FROM clubs c
      LEFT JOIN
        provinces p ON p.id = c.provinceid
      ORDER BY
        c.fullname asc
    `

    return db
      .query(sql, [])
      .then(res => res.rows)
  }
}

module.exports = getAll
