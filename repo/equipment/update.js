function makeUpdateEquipment (db) {
  return function updateEquipment (equipment, user) {
    const sql = `
      UPDATE equipment SET
        eventid = $1,
        gender = $2,
        age = $3,
        value = $4,
        unit = $5,
        _userid = $6
      WHERE
        id = $7
      RETURNING id`

    const params = [
      equipment.eventId,
      equipment.gender,
      equipment.age,
      equipment.value,
      equipment.unit,
      user.id,
      equipment.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateEquipment
