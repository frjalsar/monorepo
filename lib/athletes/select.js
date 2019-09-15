const toOrdinal = require('pg-parameterize').toOrdinal

function makeSelectAthletes (db) {
  return function selectAthletes (options, user) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        a.id,
        a.fullname,
        ${user ? 'a.ssnr,' : ''}
        a.birthyear,
        a.gender,
        a.country,
        a.lastupdated,
        a.thorid,
        a.confirmedbyuser,
        c.fullname as clubname,
        c.id as clubid,
        c.thorid as thorclubid,
        c.regionid,
        m.fromdate,
        m.todate,
        m.legacyclub
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
      params.push(opt.search + '%')
      params.push(opt.search + '%')
    }

    if (opt.regionId) {
      sql += ' AND c.regionid = ? AND m.todate is null'
      params.push(opt.regionId)
    }

    if (opt.clubId) {
      sql += ' AND c.id = ? AND m.todate is null'
      params.push(opt.clubId)
    }

    if (opt.thorClubId) {
      sql += ' AND c.thorid = ? AND m.todate is null'
      params.push(opt.thorClubId)
    }

    if (opt.legacyClub) {
      sql += ' AND m.legacyClub = ?'
      params.push(opt.legacyClub)
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
        a.ssnr ASC`

    if (opt.offset) {
      sql += ' OFFSET ' + opt.offset
    }

    if (opt.limit) {
      sql += ' LIMIT ' + opt.limit
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectAthletes
