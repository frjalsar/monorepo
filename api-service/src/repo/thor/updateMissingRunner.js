const { VarChar, Int } = require('mssql')

function makeUpdateMissingRunner (sqlPoolConnection) {
  return function updateMissingRunner (missingRunner) {
    if (missingRunner.kt.length < 10) {
      return Promise.resolve({ MsgOut: 'Vantar kennitölu' })
    }

    return sqlPoolConnection.then(pool => {
      return pool.request()
        .input('CompetitonCode', VarChar(10), missingRunner.meetCode + '')
        .input('BibNo', Int, missingRunner.bibNo)
        .input('Kennitala', VarChar(11), missingRunner.kt + '')
        .output('MsgOut', VarChar(100), '')
        .execute('UpdateHlaupararÁnkeppandanúmers')
        .then(res => res.output)
        .catch(e => {
          console.log(e)
        })
    })
  }
}

module.exports = makeUpdateMissingRunner
