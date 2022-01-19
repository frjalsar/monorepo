
const { toOrdinal } = require('pg-parameterize')

function makeSelectVenues (db) {
  return function selectVenues (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        v.id,
        v.fullname,
        v.indoor,
        v.banked,
        v.straightlanes,
        v.ovallanes,
        v.longtriplejump,
        v.polevault,
        v.hammerdiscus,
        v.javelin,
        v.shotput,
        v.material,
        v.constructionyear,
        v.renovationyear,
        v.warmuptrack,
        v.throwingfield,
        v.certification
      FROM
        venues v
      WHERE 1 = 1`

    if (opt.id) {
      sql += ' AND v.id = ?'
      params.push(opt.id)
    }

    sql += ` 
      ORDER BY
        v.fullname ASC`

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

module.exports = makeSelectVenues
