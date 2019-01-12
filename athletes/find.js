function find (db) {
  return function (searchString) {
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
      m.fromdate,
      m.todate,
      m.legacyteam      
    FROM
      athletes a
    LEFT JOIN
      membership m ON m.athleteid = a.id
    LEFT JOIN 
      clubs c ON c.id = m.clubid
    WHERE
      a.fullname like $1
    OR
      a.ssnr like $2
    ORDER BY      
      a.fullname ASC,
      a.ssnr ASC,
      m.todate DESC
  `
    return db
      .query(sql, ['%' + searchString + '%', '%' + searchString + '%'])
      .then(res => res.rows)
  }
}

module.exports = find
