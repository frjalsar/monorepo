
const { toOrdinal } = require('pg-parameterize')

function makeSelectJudges (db) {
  return function selectJudges (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        j.id,
        j.fullname,
        j.date,
        j.clubid
      FROM
        judges j
      LEFT JOIN
        clubs c ON c.id = j.clubid
      WHERE 1 = 1`

    if (opt.id) {
      sql += ' AND j.id = ?'
      params.push(opt.id)
    }

    if (opt.clubId) {
      sql += ' AND c.id = ?'
      params.push(opt.clubId)
    }

    sql += ` 
      ORDER BY
        j.fullname ASC,
        j.clubid ASC`

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

module.exports = makeSelectJudges
