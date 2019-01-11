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
          verified,
          thorid
        )
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6, $7)
        RETURNING id
      `
    return db
      .query(sql, [
        obj.fullName,
        obj.ssnr,
        obj.birthyear,
        obj.gender,
        obj.country,
        obj.verified,
        obj.thorId
      ])
      .then(res => res.rows[0].id)
      .catch(e => {
        console.log(e)
      })
  }
}

module.exports = insert
