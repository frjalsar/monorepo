function makeSelectMissingRunners (sqlPoolConnection) {
  return function selectMissingRunners () {
    const sql = `
      SELECT
        hak.[Mót] as meetCode,
        hak.[Rásnúmer] as startPosition,
        hak.[Nafn] as fullName,
        hak.[Kyn] as gender,
        hak.[Félag] as club,
        hak.[Fæð_ár] as birthyear,
        hak.[Skráð kennitala] as kt,
        c.[Name] as meetName
      FROM
        [Athletics].[dbo].[Athl$Hlauparar án keppandanúmers] hak
      LEFT JOIN 
        [Athletics].[dbo].[Athl$Competition] c ON hak.[Mót] = c.[Code]`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()

      return request
        .query(sql)
        .then(res => res.recordset)
    })
  }
}

module.exports = makeSelectMissingRunners
