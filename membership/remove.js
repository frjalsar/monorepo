function remove (db) {
  return function (athleteId) {
    const sql = `
      DELETE FROM
        membership
      WHERE
        athleteid = $1
    `

    return db
      .query(sql, [athleteId])
      .catch(e => {
        console.log(e)
      })
  }
}

module.exports = remove
