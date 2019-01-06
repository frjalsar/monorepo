const db = require('../db')

function find (searchString) {
  const sql = `
  SELECT
    a.id,
    a.fullname,
    a.birthyear,
    a.gender,
    a.country,
    a.lastupdated,
    a.verified,
    a.thorid,
    c.fullname as clubname,
    c.id as clubid,
    m.from,
    m.to,
    CASE WHEN m.to IS null THEN true ELSE false END as activeclub                  
  FROM
    athletes a
  LEFT JOIN
    membership m ON m.athleteid = a.id
  LEFT JOIN
    clubs c ON c.id = m.clubid
  WHERE
    a.fullname like $1
  ORDER BY
    a.fullname asc
`
  return db
    .query(sql, ['%' + searchString + '%'])
    .then(res => res.rows)
}

module.exports = find
