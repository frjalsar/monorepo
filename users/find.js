function find (db) {
  return function (email) {
    const sql = `
      SELECT
        id,
        email,
        password
      FROM
        users
      WHERE
        email = $1
    `

    return db
      .query(sql, [email])
      .then(res => {
        if (res.rowCount === 1) {
          return res.rows[0]
        } else {
          return null
        }
      })
  }
}

module.exports = find
