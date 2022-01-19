const toOrdinal = require('pg-parameterize').toOrdinal

function makeSelectMembership (db) {
  return function selectMembership (options) {
    const opt = options || {}
    const params = []
    let sql = `
      SELECT
        m.athleteid,
        m.clubid,
        m.fromdate,
        m.todate,
        m.legacyclub,
        m.sentat,
        m.sentby,
        m.status
      FROM membership m
      WHERE 1=1`

    if (opt.athleteId) {
      sql += ' AND m.athleteid = ?'
      params.push(opt.athleteId)
    }

    if (opt.clubId) {
      sql += ' AND m.clubid = ?'
      params.push(opt.clubid)
    }

    if (opt.status !== undefined && opt.status !== null) {
      sql += ' AND m.status = ?'
      params.push(opt.status)
    }

    sql += `
      ORDER BY
        m.athleteid ASC,
        m.sentat DESC,
        m.fromdate ASC`

    // Lets not return all data
    if (params.length === 0) {
      return Promise.resolve([])
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectMembership
