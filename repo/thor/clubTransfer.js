const { VarChar } = require('mssql')

function makeClubTransfer (sqlPoolConnection) {
  return function clubTransfer (id, club) {
    let sql = `
      UPDATE
        [Athletics].[dbo].[Athl$Competitors]
      SET
        [Félag] = @club
      WHERE
        [Númer] = @id`

    return sqlPoolConnection.then(pool => {
      console.log(id, club)
      const request = pool.request()
      
      request.input('id', VarChar(20), id)
      request.input('club', VarChar(10), club)            

      return request
        .query(sql)
        .then(res => {
          console.log(res)
          return res.rowsAffected
        })        
    })
  }
}

module.exports = makeClubTransfer