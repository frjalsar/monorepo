const { Int, Bit } = require('mssql')

function makeSelectThorEvents (sqlPoolConnection) {
  return function selectThorEvents (options) {
    let sql = `
      SELECT [Grein] as Id
        ,[Kyn] as Gender
        ,[Flokkur] as AgeCategory
        ,[Úti_Inni] as Outside
        ,[Heiti] as Name
        ,[EventCode] as EventCode
        ,[Samsettur lykill] as CompoundKey
        ,[EventCodeForRegistration] as EventCodeForRegistration
      FROM
        [Athletics].[dbo].[Athl$Events]
      WHERE 1 = 1`

    if (options.gender) {
      sql += ' AND [Kyn] = @gender'
    }

    if (options.outside) {
      sql += ' AND [Úti_Inni] = @outside'
    }

    return sqlPoolConnection.then(pool => {
      const request = pool.request()

      if (options.gender) {
        request.input('gender', Int, options.gender)
      }

      if (options.outside) {
        request.input('outside', Bit, options.outside)
      }

      return request
        .query(sql)
        .then(res => res.recordset)
    })
  }
}

module.exports = makeSelectThorEvents
