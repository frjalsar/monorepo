const db = require('../db')

function selectUsers (id) {
  const params = []
  let sql = `
    SELECT
      id,
      username,
      clubid,
      admin
    FROM users
  `

  if (id) {
    params.push(id)
    sql += 'WHERE id = $1'
  }

  return db
    .query(sql, params)
    .then(res => {
      return (res.rowCount === 1) ? res.rows[0] : null
    })
}

module.exports = selectUsers
