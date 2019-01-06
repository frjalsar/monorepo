const db = require('../db')

function insert (obj) {
  const sql = `
      INSERT INTO athletes (
        fullname,
        birthyear,
        gender,
        country,
        lastupdated,
        verified
      )
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)
      RETURNING id
    `
  return db
    .query(sql, [
      obj.fullName,
      obj.birthyear,
      obj.gender,
      obj.country,
      obj.verified
    ])
    .then(res => res.rows[0].id)
}

module.exports = insert
