function select (db) {
  return function (id) {
    const sql = `
        SELECT
          a.id,
          a.fullname,
          a.ssnr,
          a.birthyear,
          a.gender,
          a.country,
          a.lastupdated,
          a.thorid,
          a.confirmedbyuser,
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
          a.id = $1
        ORDER BY
          a.fullname ASC,
          a.ssnr ASC,
          m.todate DESC
      `
    return db
      .query(sql, [id])
      .then(res => res.rows)
  }
}

module.exports = select
