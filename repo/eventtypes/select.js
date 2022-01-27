const mapEventTypes = require('./map')

function makeSelectEventTypes (db) {
  return function selectEventTypes () {
    const params = []
    const sql = `
      SELECT
        et.id,
        et.name,
        et.ordering
      FROM
        eventtypes et
      ORDER BY
        et.ordering ASC,
        et.name ASC`

    return db
      .query(sql, params)
      .then(res => mapEventTypes(res.rows))
  }
}

module.exports = makeSelectEventTypes
