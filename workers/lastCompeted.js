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

sqlConnection
  .then(sqlPool => {
    logger.info('Connected to Thor')

    return sqlPool
      .query(`
        SELECT
          max([Dagsetning]) Dags,
          [Keppandanúmer]
        FROM
          [Athletics].[dbo].[Athl$Afrek]        
        WHERE
          [Dagsetning] <> ''
        AND
          [Keppandanúmer] <>  ''
        GROUP BY
          [Keppandanúmer]`
      )
      .then(achievements => {
        logger.info('Got achievements', { count: achievements.recordset.length })
        const values = achievements.recordset.map(item => {
          const dags = new Date(item.Dags).toUTCString()
          return '(' + item['Keppandanúmer'] + ', \'' + dags + '\'::timestamp)'
        }).join(',')

        logger.info('Starting insert')

        const sql = `
          UPDATE athletes SET
            lastcompeted = ach.dags
          FROM (VALUES
            ${values}
          ) AS ach(id, dags)
          WHERE
            ach.id = athletes.thorid`
        return pgPool.query(sql)
      })
  })
  .then(res => {
    const endtime = new Date().getTime()
    const time = endtime - starttime
    logger.info('Finished', { count: res.rowCount, time })
    process.exit(0)
  })
  .catch(e => {
    logger.error('Error came up', e)
    process.exit(1)
  })
