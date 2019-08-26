const toOrdinal = require('pg-parameterize').toOrdinal

function makeSelectAthletes (db) {
  return function selectAthletes (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        a.id,
        a.fullname,
        a.ssnr,
        a.birthyear,
        a.gender,
        a.country,
        a.lastupdated,
        a.thorid,
        a.confirmedbyuser,
        c.fullname as clubname,
        c.id as clubid,
        c.thorid as thorClubId,
        m.fromdate,
        m.todate,
        m.legacyteam
      FROM
        athletes a
      LEFT JOIN
        membership m ON m.athleteid = a.id
      LEFT JOIN 
        clubs c ON c.id = m.clubid
      WHERE 1 = 1`

    if (opt.id) {
      sql += ' AND a.id = ?'
      params.push(opt.id)
    }

    if (opt.search) {
      sql += ' AND (a.fullname ilike ? OR a.ssnr ilike ?)'
      params.push('%' + opt.search + '%')
      params.push('%' + opt.search + '%')
    }

    if (opt.thorClubId) {
      sql += ' AND c.thorid = ? AND m.todate is null'
      params.push(opt.thorClubId)
    }

    if (opt.birthyearFrom) {
      sql += ' AND a.birthyear >= ?'
      params.push(opt.birthyearFrom)
    }

    if (opt.birthyearTo) {
      sql += ' AND a.birthyear <= ?'
      params.push(opt.birthyearTo)
    }

    sql += ` 
      ORDER BY
        a.fullname ASC,
        a.ssnr ASC,
        m.todate ASC`

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectAthletes
