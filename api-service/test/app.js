require('dotenv').config()

const pg = require('pg')
const redis = require('redis')
const createService = require('../server/service')

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
})

module.exports = createService(pgPool, redisClient)
