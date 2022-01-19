
const { toOrdinal } = require('pg-parameterize')

function makeSelectUsers (db) {
  return function selectUsers (options) {
    const opt = options || {}
    const params = []
    let sql = `
      SELECT
        u.id,
        u.username,
        u.password,
        u.fullname,
        u.meetid,
        u.clubid,
        c.abbreviation clubabbreviation,
        u.regionid,
        r.abbreviation regionabbreviation,
        u.admin,
        u.token
      FROM users u
      LEFT JOIN
        clubs c ON c.id = u.clubid
      LEFT JOIN
        regions r ON r.id = u.regionid
      WHERE 1=1`

    if (opt.username) {
      sql += ' AND username = ?'
      params.push(opt.username)
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectUsers
