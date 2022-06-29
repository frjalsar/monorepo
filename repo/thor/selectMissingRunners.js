function makeSelectMissingRunners (sqlPoolConnection) {
  return function selectMissingRunners () {
    let sql = `
      SELECT [Mót] as Meet
        ,[Rásnúmer] as StartPosition
        ,[Nafn] as Name
        ,[Kyn] as Gender
        ,[Félag] as Club
        ,[Fæð_ár] as DateOfBirth        
      FROM
        [Athletics].[dbo].[Athl$Hlauparar án keppandanúmers]`      
    

    return sqlPoolConnection.then(pool => {
      const request = pool.request()
      
      return request
        .query(sql)
        .then(res => res.recordset)
    })
  }
}

module.exports = makeSelectMissingRunners
