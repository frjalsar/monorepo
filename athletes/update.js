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
          thorid = $6,
          confirmedbyuser = $7
        WHERE id = $8
        RETURNING id
      `
    obj.confirmedByUser = 1
    return db
      .query(sql, [
        obj.fullName,
        obj.ssnr,
        obj.birthyear,
        obj.gender,
        obj.country,
        obj.thorId,
        obj.verified ? obj.confirmedByUser : null,
        obj.id
      ])
      .then(res => res.rows[0].id)
  }
}

module.exports = update
