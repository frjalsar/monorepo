function makeSelectMissingRunners (sqlPoolConnection) {
  return function selectMissingRunners () {
    const sql = `
      SELECT [Mót] as meet
        ,[Rásnúmer] as startPosition
        ,[Nafn] as name
        ,[Kyn] as gender
        ,[Félag] as club
        ,[Fæð_ár] as dateOfBirth        
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
