const { VarChar, Int } = require('mssql')

function makeUpdateMissingRunner (sqlPoolConnection) {
  return function updateMissingRunner (missingRunner) {
    const { kt, fullName, meetCode, birthyear } = missingRunner
    const ktWithHypen = (kt.indexOf('-') === -1) ? kt.substring(0, 6) + '-' + kt.substring(6) : kt

    const sql = `
      UPDATE
        [Athletics].[dbo].[Athl$Hlauparar án keppandanúmers]
      SET
        [Skráð kennitala] = @kt        
      WHERE
        [Nafn] = @fullName
      AND
        [Mót] = @meetCode
      AND
        [Fæð_ár] = @birthyear`

    return sqlPoolConnection.then(pool => {
      const request = pool.request()

      request.input('kt', VarChar(11), ktWithHypen + '')
      request.input('fullName', VarChar(50), fullName + '')
      request.input('meetCode', VarChar(10), meetCode + '')
      request.input('birthyear', Int, birthyear)

      return request
        .query(sql)
        .then(res => {
          return res.rowsAffected
        })
        .catch(e => {
          console.log(e)
        })
    })
  }
}

module.exports = makeUpdateMissingRunner
