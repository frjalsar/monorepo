function find (db) {
  return function (thorId) {
    const params = [thorId, birthyearFrom, birthyearTo]
    const sql = `
      SELECT
        a.id,
        a.fullname,
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
        m.thorid = $1
      AND
        a.birthyear BETWEEN $2 AND $3
      AND
        a.birht
      ORDER BY
        a.fullname ASC,
        a.ssnr ASC,
        m.todate DESC`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = find
