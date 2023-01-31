const mapCompetitions = require('./map')

function makeSelectCompetitions (db) {
  return function selectCompetitions (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        c.id,
        c.meetid,
        c.eventid,
        c.agefrom,
        c.ageto,
        c.gender,
        c.indoor
      FROM
        competitions c
      --LEFT JOIN
        --meets m ON m.id = c.meetid
      WHERE 1 = 1`

    if (opt.meetId) {
      sql += ' AND c.meetid = $1'
      params.push(opt.meetId)
    }

    sql += 'ORDER BY c.id ASC'

    return db
      .query(sql, params)
      .then(res => mapCompetitions(res.rows))
  }
}

module.exports = makeSelectCompetitions
