const pg = require('pg')
const readFileSync = require('fs').readFileSync
const readdirSync = require('fs').readdirSync
const join = require('path').join

console.log('dirname', __dirname)
const dirname = readdirSync(__dirname)
console.log(dirname)

console.log('cert', join(__dirname, 'cert'))
const cert = readdirSync(join(__dirname, 'cert'))
console.log(cert)

console.log('certs', join(__dirname, 'certs'))
const certs = readdirSync(join(__dirname, 'certs'))
console.log(certs)

const pool = new pg.Pool({
  user: process.env.FRJALSAR_USERNAME,
  host: process.env.FRJALSAR_HOST,
  database: process.env.FRJALSAR_DATABASE,
  password: process.env.FRJALSAR_PASSWORD,
  port: process.env.FRJALSAR_PORT,
  ssl: {
    rejectUnauthorized: false,
    ca: readFileSync('./frjalsar.cer').toString()
  }
})

module.exports = pool
