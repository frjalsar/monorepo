const { genSaltSync, hashSync } = require('bcryptjs')
const db = require('../db')

function insertUser (obj) {
  const sql = `
    INSERT INTO users (
      username,
      password,
      clubid,
      admin      
    ) VALUES (
      $1, $2, $3, $4
    )
    RETURNING id`

  // TODO: Not use sync versions
  const salt = genSaltSync(10)
  const password = hashSync(obj.password, salt)

  const params = [
    obj.username,
    password,
    obj.clubId,
    obj.admin
  ]

  return db
    .query(sql, params)
    .then(res => res.rows[0].id)
}

module.exports = insertUser
