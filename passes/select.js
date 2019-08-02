
function select (db) {
  return (athleteId) => {
    const sql = `
      SELECT
        p.id,
        p.athleteid,
        p.created,
        p.expires,
        a.fullname
      FROM passes p
      JOIN athletes a
      ON p.athleteId = a.id
      WHERE athleteid = $1
    `

    return db
      .query(sql, [athleteId])
      .then(res => res.rows[0])
  }
}

module.exports = select
