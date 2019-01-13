function select (db) {
  return function (id) {
    const sql = `
      SELECT
        c.id,
        c.fullname,
        c.shortname,
        c.abbreviation,
        c.thorid,
        p.id provinceid,
        p.fullname provincename,
        p.abbreviation provinceabbr
      FROM clubs c
      LEFT JOIN
        provinces p ON p.id = c.provinceid
      WHERE
        c.id = $1
    `

    return db
      .query(sql, [id])
      .then(res => res.rows)
  }
}

module.exports = select
