require('dotenv').config()
const logger = require('heroku-logger')
const pg = require('pg')
const sql = require('mssql')

logger.info('Worker started')
const starttime = new Date().getTime()
const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const sqlConnectionPool = new sql.ConnectionPool(process.env.THOR_URL)
const sqlConnection = sqlConnectionPool.connect()

let counter = 0
pgPool
  .query('SELECT id, thorid FROM athletes WHERE id > 397')
  .then(res => {    
    logger.info('Got list athletes', { count: res.rows.length })

    return sqlConnection.then(sqlPool => {
      logger.info('Connected to thor')
      return res.rows.reduce((prev, curr) => {
        return prev.then(() => {
          return sqlPool.query(`
            SELECT TOP 1 [Dagsetning]
            FROM [Athletics].[dbo].[Athl$Afrek]
            WHERE [Keppandanúmer] = ${curr.thorid}
            ORDER BY [Dagsetning] DESC
          `)
        }).then(res => {
          const dags = (res && res.recordset.length && res.recordset[0].Dagsetning) || null
          
          return pgPool
            .query('UPDATE athletes SET lastcompeted = $1 WHERE id = $2', [dags, curr.id])
            .then(() => {
              counter++
              logger.info('Updated', curr)
            })
        })
      }, Promise.resolve())
    })
  }).then(() => {
    const endtime = new Date().getTime()
    const time = endtime - starttime
    logger.info('Finished', { counter, time })
    process.exit(0)
  })
  .catch(e => {
    logger.error('Error came up', e)
    process.exit(1)
  })
