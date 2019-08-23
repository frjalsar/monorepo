function makeInsertAthlete (db) {
  return function insertAthlete (athlete) {
    const sql = `
        INSERT INTO athletes (
          fullname,
          ssnr,
          birthyear,
          gender,
          country,
          lastupdated,
          thorid,
          confirmedbyuser
        )
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6, $7)
        RETURNING id
      `

    athlete.confirmedByUser = 1 // hack þangað til að login kemur

    const params = [
      athlete.fullName,
      athlete.ssnr,
      athlete.birthyear,
      athlete.gender,
      athlete.country,
      athlete.thorId,
      athlete.verified ? athlete.confirmedByUser : null
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertAthlete
