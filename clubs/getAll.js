const db = require('../db')

function getAll () {
  const sql = `
    SELECT
      c.id,
      c.fullname,
      c.shortname,
      c.abbreviation
    FROM clubs c`

  return db
    .query(sql, [])
    .then(res => res.rows)
}

module.exports = getAll
