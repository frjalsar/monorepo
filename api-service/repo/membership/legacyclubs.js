function makeSelectLegacyClubs (db) {
  return function selectLegacyClubs () {
    const sql = `
      SELECT DISTINCT
        legacyclub
      FROM
        membership
      ORDER BY
        legacyclub ASC`

    return db
      .query(sql)
      .then(res => res.rows.map(row => row.legacyclub))
  }
}

module.exports = makeSelectLegacyClubs
