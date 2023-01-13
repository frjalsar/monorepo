const { VarChar } = require('mssql')
function makeSelectCompetitor (sqlPoolConnection) {
  return async function selectCompetitor (options) {
    const { kt } = options
    const ktWithHyphen = (kt.indexOf('-') === -1) ? kt.substring(0, 6) + '-' + kt.substring(6) : kt

    const sql = `
        SELECT [Númer] as thorId
          ,Replace([Kennitala], '-', '') as kt
          ,[Nafn] as fullName
          ,[Land] as country
          ,[Fæðingarár] as birthyear
          ,[Kyn] as gender  
          ,[E-Mail] as email
          ,[Fæðingardagur] as dateOfBirth
          ,[Félag] as club
        FROM
        [Athletics].[dbo].[Athl$Competitors] WHERE [Kennitala]=@kt`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()
      request.input('kt', VarChar(20), ktWithHyphen + '')

      return request
        .query(sql)
        .then(res => res.recordset)
    })
  }
}

module.exports = makeSelectCompetitor
