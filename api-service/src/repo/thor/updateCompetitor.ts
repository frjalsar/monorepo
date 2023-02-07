import { VarChar } from 'mssql'

export const makeUpdateCompetitor=function (sqlPoolConnection) {
  return function updateCompetitor (id, clubName, fullName) {
    const sql = `
      UPDATE
        [Athletics].[dbo].[Athl$Competitors]
      SET
        [Félag] = @clubName,
        [Nafn] = @fullName
      WHERE
        [Númer] = @id`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()

      request.input('id', VarChar(20), id + '')
      request.input('clubName', VarChar(10), clubName + '')
      request.input('fullName', VarChar(35), fullName + '')

      return request
        .query(sql)
        .then(res => {
          return res.rowsAffected
        })
    })
  }
}

