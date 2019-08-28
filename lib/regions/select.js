function makeSelectRegions (db) {
  return function selectRegions (options) {
    const opt = options || {}
    const params = []

    let sql = `
      SELECT
        r.id,
        r.abbreviation,
        r.fullname,
        r.verifieddate,
        r.verifieduserid,
        u.fullname userfullname
      FROM
        regions r
      LEFT JOIN
        users u ON u.id = r.verifieduserid
      WHERE 1 = 1`

    if (opt.id) {
      sql += 'AND r.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY r.fullname asc'

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectRegions
