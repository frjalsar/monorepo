const pg = require('pg')
const readFileSync = require('fs').readFileSync

const pool = new pg.Pool({
  user: process.env.FRJALSAR_USERNAME,
  host: process.env.FRJALSAR_HOST,
  database: process.env.FRJALSAR_DATABASE,
  password: process.env.FRJALSAR_PASSWORD,
  port: process.env.FRJALSAR_PORT,
  ssl: {
    rejectUnauthorized: false,
    ca: readFileSync('./frjalsar.crt').toString()
  }
})

module.exports = pool
