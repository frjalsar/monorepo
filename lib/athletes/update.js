function makeUpdateAthlete (db) {
  return function updateAthlete (athlete) {
    const sql = `
        UPDATE athletes
        SET
          fullname = $1,
          kt = $2,
          birthyear = $3,
          gender = $4,
          country = $5,
          lastupdated = CURRENT_TIMESTAMP,
          thorid = $6,
          confirmedbyuser = $7
        WHERE id = $8
        RETURNING id
      `
    athlete.confirmedByUser = 1

    const params = [
      athlete.fullName,
      athlete.kt,
      athlete.birthyear,
      athlete.gender,
      athlete.country,
      athlete.thorId,
      athlete.verified ? athlete.confirmedByUser : null,
      athlete.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateAthlete
