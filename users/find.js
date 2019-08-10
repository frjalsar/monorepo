const db = require('../db')

function findUser (username) {
  const params = [username]
  const sql = `
    SELECT
      id,
      username,
      password,
      clubid,
      admin
    FROM users
    WHERE
      username = $1`

  return db
    .query(sql, params)
    .then(res => {
      return (res.rowCount === 1) ? res.rows[0] : null
    })
}

module.exports = findUser
