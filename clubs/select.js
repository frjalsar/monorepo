function select (db) {
  return function (id) {
    const sql = `
      SELECT
        c.id,
        c.fullname,
        c.shortname,
        c.abbreviation,
        c.thorid,
        p.id regionid,
        p.fullname regionname,
        p.abbreviation regionabbr
      FROM clubs c
      LEFT JOIN
        regions p ON p.id = c.regionid
      WHERE
        c.id = $1
    `

    return db
      .query(sql, [id])
      .then(res => res.rows)
  }
}

module.exports = select
