const db = require('../db')

function find (searchString) {
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
    a.fullname like $1
  OR
    a.ssnr like $2
  ORDER BY
    a.fullname asc
`
  return db
    .query(sql, ['%' + searchString + '%', '%' + searchString + '%'])
    .then(res => res.rows)
}

module.exports = find
