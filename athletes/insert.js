const db = require('../db')

function insert (obj) {
  const sql = `
      INSERT INTO athletes (
        fullname,
        ssnr
      )
      VALUES ($1, $2)
      RETURNING id
    `
  return db
    .query(sql, [obj.fullName, obj.ssnr])
    .then(res => res.rows[0].id)
}

module.exports = insert
