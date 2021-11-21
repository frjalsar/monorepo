function makeSelectEvents (db) {
  return function selectEvents (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        e.id,
        e.strid,
        e.name,
        e.iaaf,
        e.worldrecord,        
        e.typeid,
        et.name as type
      FROM
        events e
      JOIN
        eventtypes et ON e.typeid = et.id
      WHERE 1 = 1`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectEvents
