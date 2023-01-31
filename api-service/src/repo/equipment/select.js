const mapEquipment = require('./map')

function makeSelectEquipment (db) {
  return function selectEqiupment (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        eq.id,
        eq.eventid,
        eq.gender,
        eq.age,
        eq.value,
        eq.unit,
        ev.name eventname
      FROM equipment eq
      LEFT JOIN
        events ev ON ev.id = eq.eventid`

    if (opt.id) {
      sql += ' WHERE eq.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY ev.name ASC, eq.age ASC, eq.gender ASC'

    return db
      .query(sql, params)
      .then(res => mapEquipment(res.rows))
  }
}

module.exports = makeSelectEquipment
