const { VarChar } = require('mssql')

function makeUpdateCompetitor (sqlPoolConnection) {
  return function updateCompetitor (id, club) {
    const sql = `
      UPDATE
        [Athletics].[dbo].[Athl$Competitors]
      SET
        [Félag] = @club
      WHERE
        [Númer] = @id`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()

      request.input('id', VarChar(20), id)
      request.input('club', VarChar(10), club)

      return request
        .query(sql)
        .then(res => {
          return res.rowsAffected
        })
    })
  }
}

module.exports = makeUpdateCompetitor
