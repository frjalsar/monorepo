function makeSelectClubs (db) {
  return function selectClubs (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        c.id,
        c.fullname,
        c.shortname,
        c.abbreviation,
        c.thorid,
        r.id regionid,
        r.fullname regionname,
        r.abbreviation regionabbrevation
      FROM clubs c
      LEFT JOIN
        regions r ON r.id = c.regionid`

    if (opt.id) {
      sql += ' WHERE c.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY c.fullname asc'

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectClubs
