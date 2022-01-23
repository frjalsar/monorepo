function makeInsertEventType (db) {
  return function insertEventType (eventType, user) {
    const sql = `
      INSERT INTO eventtypes (
        name,
        _userid,
        _enabled,
        _time
      )
      VALUES ($1, $2, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      eventType.name,
      eventType.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertEventType
