const mapEventTypes = require('./map')

function makeSelectEventTypes (db) {
  return function selectEventTypes () {
    const params = []
    const sql = `
      SELECT
        et.id,
        et.name
      FROM
        eventtypes et
      WHERE 1 = 1`

    return db
      .query(sql, params)
      .then(res => mapEventTypes(res.rows))
  }
}

module.exports = makeSelectEventTypes
