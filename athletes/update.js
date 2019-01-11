function update (db) {
  return function (obj) {
    const sql = `
        UPDATE athletes
        SET
          fullname = $1,
          ssnr = $2,
          birthyear = $3,
          gender = $4,
          country = $5,
          lastupdated = CURRENT_TIMESTAMP,
          verified = $6,
          thorid = $7        
        WHERE id = $8
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
        obj.thorId,
        obj.id
      ])
      .then(res => res.rows[0].id)
  }
}

module.exports = update
