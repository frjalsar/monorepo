function makeUpdateAthlete (db) {
  return function updateAthlete (athlete, user) {
    const sql = `
        UPDATE athletes
        SET
          fullname = $1,
          kt = $2,
          birthyear = $3,
          gender = $4,
          country = $5,
          thorid = $6,
          _userid = $7,
          _enabled = true,
          _time = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING id`

    const params = [
      athlete.fullName,
      athlete.kt,
      athlete.birthyear,
      athlete.gender,
      athlete.country,
      athlete.thorId,
      user.id,
      athlete.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateAthlete
