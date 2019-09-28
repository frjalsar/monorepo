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
          modifiedby = $7          
        WHERE id = $8
        RETURNING id
      `

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
