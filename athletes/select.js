function select (db) {
  return function (id) {
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
          CASE WHEN m.todate IS null THEN true ELSE false END as activeclub
        FROM
          athletes a
        LEFT JOIN
          membership m ON m.athleteid = a.id
        LEFT JOIN
          clubs c ON c.id = m.clubid
        WHERE
          a.id = $1
      `
    return db
      .query(sql, [id])
      .then(res => res.rows)
  }
}

module.exports = select
