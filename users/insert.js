function insert (db) {
  return function (obj) {
    const sql = `
      INSERT INTO users (
        email,
        password,
        fullname,
        clubid,
        admin
      )
      VALUES ($1, $2, $3, $4, $5)
      )
    `

    return sql
  }
}

module.exports = insert
