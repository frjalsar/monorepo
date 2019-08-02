
function select (db) {
  return (athleteId) => {
    const sql = `
      SELECT
        qr
      FROM passes
      WHERE athleteid = $1
    `

    return db
      .query(sql, [athleteId])
      .then(res => res.rows[0].qr)
  }
}

module.exports = select
