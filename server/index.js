require('dotenv').config()
const { parseMssqlConnectionString } = require('@tediousjs/connection-string')
const pg = require('pg')
const sql = require('mssql')
const redis = require('redis')
const logger = require('heroku-logger')
const createService = require('./service')

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
})

const sqlPool = new sql.ConnectionPool({
  user: process.env.THOR_USER,
  password: process.env.THOR_PWD,
  server: process.env.THOR_SERVER,
  database: process.env.THOR_DB,  
})
const sqlConnection = sqlPool.connect()

const jiraConfig = {
  url: process.env.JIRA_URL,
  auth: Buffer.from(process.env.JIRA_USERNAME + ':' + process.env.JIRA_TOKEN).toString('base64')
}

createService(
  pgPool,
  redisClient,
  sqlConnection,
  jiraConfig,
  logger
).listen(process.env.PORT || 3000)
