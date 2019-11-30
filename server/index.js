require('dotenv').config()

const pg = require('pg')
const sql = require('mssql')
const redis = require('redis')
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

const sqlPool = new sql.ConnectionPool(process.env.THOR_URL)
const sqlConnection = sqlPool.connect()

createService(pgPool, redisClient, sqlConnection).listen(process.env.PORT || 3000)
