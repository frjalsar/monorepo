const mapRegions = require('./map')

function makeSelectRegions (db) {
  return function selectRegions (options) {
    const opt = options || {}
    const params = []

    let sql = `
      SELECT
        r.id,
        r.abbreviation,
        r.fullname
      FROM
        regions r
      WHERE 1 = 1`

    if (opt.id) {
      sql += 'AND r.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY r.fullname asc'

    return db
      .query(sql, params)
      .then(res => mapRegions(res.rows))
  }
}

module.exports = makeSelectRegions
