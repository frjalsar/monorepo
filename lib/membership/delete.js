function makeDeleteMembership (db) {
  return function deleteMembership (athleteId) {
    const sql = `
      DELETE FROM
        membership
      WHERE
        athleteid = $1`

    const params = [athleteId]

    return db
      .query(sql, params)
  }
}

module.exports = makeDeleteMembership
