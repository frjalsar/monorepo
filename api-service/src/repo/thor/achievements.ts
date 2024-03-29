import { Int, Bit, mssqlPool } from 'mssql'
import isEmpty from 'lodash.isempty'
import { SelectThorAchievements } from 'types/thor'

export type MakeSelectThorAchievements = (sqlPoolConnection: mssqlPool) => SelectThorAchievements

export const makeSelectThorAchievements: MakeSelectThorAchievements = function (sqlPoolConnection) {
  return function selectThorAchievements (options) {
    if (isEmpty(options)) {
      return Promise.resolve([])
    }
    let top = ''

    if (options && !options.thorAthleteId) {
      if (options.limit && options.limit > 0) {
        top = 'TOP ' + options.limit
      } else {
        top = 'TOP 100'
      }
    }

    let sql = `SELECT ${top} * FROM (
      SELECT
        ROW_NUMBER() OVER (
          PARTITION BY [Keppandanúmer]
          ORDER BY
            [Metrar] DESC,
            [Tími] ASC
        ) AS 'Röðun árangurs',
        [Grein],
        [Röð],
        [Árangur],
        [Metrar],
        [Tími],
        [Vindur],
        [Úti_Inni] as Inni,
        [Keppandanúmer],
        [Nafn],
        [Erlendur ríkisborgari],
        [Félag],
        [Kyn],
        [Dagsetning],
        [Aldur keppanda],
        [Heiti Móts],
        [Mót],
        [Staður]
      FROM 
        [Athletics].[dbo].[Athl$Afrek]
      WHERE 1 = 1`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()

      if (options && options.gender) {
        sql += ' AND [Kyn] = @gender'
        request.input('gender', Int, options.gender)
      }

      if (options && options.inside) {
        const inside = options.inside === 'true'
        sql += ' AND [Úti_Inni] = @outside'
        // 1 is inside, 0 is outside
        request.input('outside', Bit, inside)
      }

      if (options && options.thorAthleteId) {
        sql += ' AND [Keppandanúmer] = @thorAthleteId'
        request.input('thorAthleteId', options.thorAthleteId)
      }

      if (options && options.thorEventId) {
        sql += ' AND [Grein] = @thorEventId'
        request.input('thorEventId', options.thorEventId)
      }

      if (options && options.dateFrom) {
        sql += ' AND [Dagsetning] >= @dateFrom'
        request.input('dateFrom', options.dateFrom)
      }

      if (options && options.dateTo) {
        sql += ' AND [Dagsetning] <= @dateTo'
        request.input('dateTo', options.dateTo)
      }

      sql += ' AND [Erlendur ríkisborgari] IN (0'

      if (options && options.includeForeigners) {
        const includeForeigners = options.includeForeigners === 'true' ? 1 : 0
        sql += ', @includeForeigners'
        request.input('includeForeigners', Int, includeForeigners)
      }

      sql += ')) AS TopList'

      if (options && options.byAthlete) {
        sql += ' WHERE [Röðun árangurs] = 1'
      }

      sql += ` ORDER BY
        [Grein] ASC,
        [Metrar] DESC,
        [Tími] ASC,
        [Röð] ASC,
        [Nafn] ASC`

      return request
        .query(sql)
        .then(res => res.recordset)
    })
  }
}
