
const toOrdinal = require('pg-parameterize').toOrdinal

function makeSelectPasses (db) {
  return function selectPasses (options) {
    const opt = options || {}
    const params = []

    let sql = `
      SELECT
        p.id,
        p.athleteid,
        p.qr,
        p.created,
        p.expires,
        a.fullname
      FROM passes p
      JOIN athletes a
      ON p.athleteId = a.id
      WHERE athleteid = 1 = 1
    `
    if (opt.athleteId) {
      sql += ' AND p.athleteId = ?'
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows[0])
  }
}

module.exports = makeSelectPasses
