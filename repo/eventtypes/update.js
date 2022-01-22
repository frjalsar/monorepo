function makeUpdateEventType (db) {
  return function updateEventType (eventType, user) {
    const sql = `
      UPDATE eventtypes SET
        name = $1,        
        _userid = $2,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $3
      RETURNING id`

    const params = [
      eventType.name,
      user.id,
      eventType.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateEventType
