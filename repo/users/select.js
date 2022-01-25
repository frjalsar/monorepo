
const { toOrdinal } = require('pg-parameterize')
const mapUsers = require('./map')

function makeSelectUsers (db) {
  return function selectUsers (options) {
    const opt = options || {}
    const selectPassword = Boolean(opt.username)
    const params = []
    let sql = `
      SELECT
        u.id,
        u.username,
        ${selectPassword ? 'u.password,' : ''}
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

    sql += ` ORDER BY u.fullname ASC`

    return db
      .query(toOrdinal(sql), params)
      .then(res => mapUsers(res.rows))
  }
}

module.exports = makeSelectUsers
