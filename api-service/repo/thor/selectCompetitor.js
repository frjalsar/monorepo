const { VarChar } = require('mssql')
function makeSelectCompetitor (sqlPoolConnection) {
  return async function selectCompetitor (options) {
    const { id } = options
    const sql = `
        SELECT [Númer] as thorId
          ,[Kennitala] as kt
          ,[Nafn] as fullName
          ,[Land] as country
          ,[Fæðingarár] as birthyear
          ,[Kyn] as gender  
          ,[E-Mail] as email
          ,[Fæðingardagur] as dateOfBirth
        FROM
        [Athletics].[dbo].[Athl$Competitors] WHERE [Kennitala]=@id`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()
      request.input('id', VarChar(20), id + '')
      return request
        .query(sql)
        .then(res => res.recordset)
    })
  }
}

module.exports = makeSelectCompetitor
