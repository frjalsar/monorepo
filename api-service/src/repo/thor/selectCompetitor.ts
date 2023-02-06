import { VarChar } from 'mssql'
import { mssqlPool } from 'mssql'
import { SelectCompetitor } from 'types/thor'

export type MakeSelectCompetitor = (sqlPoolConnection: mssqlPool) => SelectCompetitor

export const makeSelectCompetitor: MakeSelectCompetitor = function (sqlPoolConnection) {
  return async function selectCompetitor(options) {
    const { kt } = options
    const ktWithHyphen = (kt.indexOf('-') === -1) ? kt.substring(0, 6) + '-' + kt.substring(6) : kt

    const sql = `
    SELECT
      [Númer] as thorId,
      Replace(c.[Kennitala], '-', '') as kt,
      c.[Nafn] as fullName,
      c.[Fæðingarár] as birthyear,
      c.[Kyn] as gender,  
      c.[E-Mail] as email,
      c.[Fæðingardagur] as dateOfBirth,
      c.[Félag] as club,
      c.[Land] as country,
      Year(Min(a.[Dagsetning])) as firstCompetition
    FROM
      [Athletics].[dbo].[Athl$Competitors] c
    LEFT JOIN
      [Athletics].[dbo].[Athl$Afrek] a ON c.[Númer] = a.[Keppandanúmer]
    WHERE c.[Kennitala]=@kt
    GROUP BY 
      c.[Númer],
      c.[Kennitala],
      c.[Nafn],
      c.[Land],
      c.[Fæðingarár],
      c.[Kyn],
      c.[E-Mail],
      c.[Fæðingardagur],
      c.[Félag]`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()
      request.input('kt', VarChar(20), ktWithHyphen + '')

      return request
        .query(sql)
        .then(res => res.recordset)
    })
  }
}

