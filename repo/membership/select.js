const toOrdinal = require('pg-parameterize').toOrdinal

function makeSelectMembership (db) {
  return function selectMembership (options) {
    const opt = options || {}
    const params = []
    let sql = `
      SELECT
        m.athleteid,
        m.clubid,
        m.yearfrom,
        m.yearto,
        m.legacyclub,
        m.confirmed
      FROM membership m
      WHERE
        _enabled = true`

    if (opt.athleteId) {
      sql += ' AND m.athleteid = ?'
      params.push(opt.athleteId)
    }

    if (opt.clubId) {
      sql += ' AND m.clubid = ?'
      params.push(opt.clubid)
    }

    if (opt.confirmed !== undefined && opt.confirmed !== null) {
      sql += ' AND m.confirmed = ?'
      params.push(opt.confirmed)
    }

    sql += `
      ORDER BY
        m.athleteid ASC,
        m.yearfrom ASC`


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
