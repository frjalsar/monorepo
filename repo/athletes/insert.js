function makeInsertAthlete (db) {
  return function insertAthlete (athlete, user) {
    const sql = `
        INSERT INTO athletes (
          fullname,
          kt,
          birthyear,
          gender,
          country,
          thorid,
          modifiedby,
          modifiedat                   
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP(3))
        RETURNING id
      `

    const params = [
      athlete.fullName,
      athlete.kt,
      athlete.birthyear,
      athlete.gender,
      athlete.country,
      athlete.thorId,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertAthlete
