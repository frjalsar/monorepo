require('dotenv').config()

const pg = require('pg')
const sql = require('mssql')
const redis = require('redis')
const logger = require('heroku-logger')
const createApp = require('./app')
const makeAuthorize = require('../composition/authorize')
const makeAthletes =  require('../composition/athletes')
const makeClubs =  require('../composition/clubs')
const makeEvents =  require('../composition/events')
const makeJudges =  require('../composition/judges')
const makeRegions =  require('../composition/regions')
const makeVenues =  require('../composition/venues')
const makeThor = require('../composition/thor')


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
  password: process.env.THOR_PASSWORD,
  server: process.env.THOR_SERVER,
  database: process.env.THOR_DB,
  options: {
    trustServerCertificate: process.env.NODE_ENV !== 'production',
  }
})

const sqlConnection = sqlPool.connect()
const isProduction = process.env.NODE_ENV === 'production'

const app = createApp(isProduction)
const authorize = makeAuthorize(redisClient, pgPool, logger)
// app.use(authorize())
app.use('/athletes', makeAthletes(pgPool))
app.use('/clubs', makeClubs(pgPool))
app.use('/events', makeEvents(pgPool))
app.use('/judges', makeJudges(pgPool))
app.use('/regions', makeRegions(pgPool))
app.use('/venues', makeVenues(pgPool))
app.use('/thor', makeThor(sqlConnection))


app.get('/user', (req, res) => {
  if (req.user) {
    return res.json(req.user)
  }

  return res.sendStatus(404)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  logger.info('server running on port ' + port)
})
