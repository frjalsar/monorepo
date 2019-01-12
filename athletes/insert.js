function insert (db) {
  return function (obj) {
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
    obj.confirmedByUser = 1 // hack þangað til að login kemur

    return db
      .query(sql, [
        obj.fullName,
        obj.ssnr,
        obj.birthyear,
        obj.gender,
        obj.country,
        obj.thorId,
        obj.verified ? obj.confirmedByUser : null
      ])
      .then(res => res.rows[0].id)
  }
}

module.exports = insert
