const pg = require('pg')
const readFileSync = require('fs').readFileSync

const pool = new pg.Pool({
  user: process.env.FRJALSAR_PG_USERNAME,
  host: process.env.FRJALSAR_PG_HOST,
  database: process.env.FRJALSAR_PG_DATABASE,
  password: process.env.FRJALSAR_PG_PASSWORD,
  port: process.env.FRJALSAR_PG_PORT,
  ssl: {
    rejectUnauthorized: false,
    ca: readFileSync('./frjalsar.cer').toString()
  }
})

module.exports = pool
