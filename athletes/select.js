const db = require('../db')

function select (id) {
  const sql = `
      SELECT
        a.id,
        a.fullname,
        a.ssnr,
        c.fullname as clubname,
        c.id as clubid,
        m.from,
        m.to,
        CASE WHEN m.to IS null THEN true ELSE false END as activeclub                  
      FROM
        athletes a
      JOIN
        membership m ON m.athleteid = a.id
      JOIN
        clubs c ON c.id = m.clubid
      WHERE
        a.id = $1
    `
  return db
    .query(sql, [id])
    .then(res => res.rows)
}

module.exports = select
