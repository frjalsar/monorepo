
import { mssqlPool } from 'mssql'
import { SelectMissingRunners } from 'types/thor'

export type MakeSelectMissingRunners = (sqlPoolConnection: mssqlPool) => SelectMissingRunners

export const makeSelectMissingRunners: MakeSelectMissingRunners = function (sqlPoolConnection) {
  return function selectMissingRunners (opt) {
    return sqlPoolConnection.then(pool => {
      const request = pool.request()

      let sql = `
        SELECT
          concat(hak.[Mót], '-', hak.[Rásnúmer])  as id,
          hak.[Mót] as meetCode,
          hak.[Rásnúmer] as bibNo,
          hak.[Nafn] as fullName,
          hak.[Kyn] as gender,
          hak.[Félag] as club,
          hak.[Fæð_ár] as birthyear,
          coalesce(hak.[Leiðrétt kennitala], hak.[Skráð kennitala]) as kt,
          hak.[Keppandanúmer] as competitorId,
          CAST(CASE WHEN hak.[Leiðrétt kennitala] <> '' THEN 1 ELSE 0 END as bit)  as fixed,
          c.[Name] as meetName
        FROM
          [Athletics].[dbo].[Athl$Hlauparar án keppandanúmers] hak
        JOIN 
          [Athletics].[dbo].[Athl$Competition] c ON hak.[Mót] = c.[Code]
        WHERE
          1=1`

      if (opt && opt.meetCode) {
        sql += ' AND hak.[Mót] = @meetCode'
        request.input('meetCode', opt.meetCode)
      }

      if (opt && opt.showFixed) {
        sql += ' AND CAST(CASE WHEN hak.[Leiðrétt kennitala] <> \'\' THEN 1 ELSE 0 END as bit) = @showFixed'
        request.input('showFixed', opt.showFixed)
      }

      return request
        .query(sql)
        .then(res => res.recordset)
        .catch(e => {
          console.log(e)
        })
    })
  }
}
