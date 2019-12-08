const { Int, Bit } = require('mssql')
const isEmpty = require('lodash.isempty')

function makeSelectThorAchievements (sqlPoolConnection) {
  return function selectThorAchievements (options) {
    if (isEmpty(options)) {
      return Promise.resolve([])
    }
    let top = ''

    if (!options.thorAthleteId) {
      if (options.limit && options.limit > 0) {
        top = 'TOP ' + options.limit
      } else {
        top = 'TOP 100'
      }
    }
    let sql = `SELECT ${top}
        [Grein],
        [Röð],
        [Árangur],
        [Metrar],
        [Tími],
        [Vindur],
        [Úti_Inni],
        [Keppandanúmer],
        [Nafn],
        [Félag],
        [Kyn],
        [Aldur keppanda],
        [Dagsetning],
        [Mót],
        [Heiti Móts],
        [Staður]
      FROM [Athletics].[dbo].[Athl$Afrek]
      WHERE 1 = 1`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()

      if (options.gender) {
        sql += ' AND [Kyn] = @gender'
        request.input('gender', Int, options.gender)
      }

      if (options.outside) {
        sql += ' AND [Úti_Inni] = @outside'
        request.input('outside', Bit, options.outside)
      }

      if (options.thorAthleteId) {
        sql += ' AND [Keppandanúmer] = @thorAthleteId'
        request.input('thorAthleteId', options.thorAthleteId)
      }

      if (options.thorEventId) {
        sql += ' AND [Grein] = @thorEventId'
        request.input('thorEventId', options.thorEventId)
      }

      if (options.dateFrom) {
        sql += ' AND [Dagsetning] >= @dateFrom'
        request.input('dateFrom', options.dateFrom)
      }

      if (options.dateTo) {
        sql += ' AND [Dagsetning] <= @dateTo'
        request.input('dateTo', options.dateTo)
      }

      sql += ` ORDER BY
        [Grein] ASC,
        [Metrar] DESC,
        [Tími] ASC,
        [Röð] ASC,
        [Nafn] ASC`
      console.log(sql)
      return request
        .query(sql)
        .then(res => res.recordset)
    })
  }
}

module.exports = makeSelectThorAchievements
