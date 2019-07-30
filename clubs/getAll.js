function getAll (db) {
  return function () {
    const sql = `
      SELECT
        c.id,
        c.fullname,
        c.shortname,
        c.abbreviation,
        r.id regionid,
        r.fullname regionname,
        r.abbreviation regionabbr
      FROM clubs c
      LEFT JOIN
        regions r ON r.id = c.regionid
      ORDER BY
        c.fullname asc
    `

    return db
      .query(sql, [])
      .then(res => res.rows)
  }
}

module.exports = getAll
