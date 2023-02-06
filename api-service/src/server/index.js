require('dotenv').config()

const pg = require('pg')
const sql = require('mssql')
const redis = require('redis')
const logger = require('pino')()
const pinoHTTP = require('pino-http')
const createApp = require('./app')
const makeAgeGroups = require('../composition/agegroups')
const { makeAuthenticate } = require('../composition/authenticate')
const makeAthletes = require('../composition/athletes')
const { makeClubs } = require('../composition/clubs')
const makeCompetitions = require('../composition/competitions')
const makeEquipment = require('../composition/equipment')
const { makeEvents } = require('../composition/events')
const { makeEventTypes } = require('../composition/eventtypes')
const { makeJudges } = require('../composition/judges')
const { makeJudgeTypes } = require('../composition/judgetypes')
const makeMeets = require('../composition/meets')
const makeLogin = require('../composition/login')
const makeMembership = require('../composition/membership')
const { makeRegions } = require('../composition/regions')
const { makeUsers } = require('../composition/users')
const { makeVenues } = require('../composition/venues')
const makeThor = require('../composition/thor')
const makeSendMail = require('../lib/sendmail')

const isProduction = process.env.NODE_ENV === 'production'

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
    encrypt: false,
    trustServerCertificate: true
  }
})

const sendMail = makeSendMail(process.env.MAILGUN_API_KEY, process.env.MAILGUN_DOMAIN, isProduction)
const authenticate = makeAuthenticate(pgPool, redisClient, logger)

const sqlConnection = sqlPool.connect()

const app = createApp(isProduction)
app.use(pinoHTTP({
  logger,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url
    }),
    res: (res) => ({
      statusCode: res.statusCode
    })
  }
}))

app.use('/login', makeLogin(pgPool, redisClient, isProduction))
app.use(authenticate())
app.use('/agegroups', makeAgeGroups())
app.use('/athletes', makeAthletes(pgPool, sqlConnection))
app.use('/clubs', makeClubs(pgPool))
app.use('/competitions', makeCompetitions(pgPool))
app.use('/equipment', makeEquipment(pgPool))
app.use('/events', makeEvents(pgPool, logger))
app.use('/eventtypes', makeEventTypes(pgPool))
app.use('/judges', makeJudges(pgPool))
app.use('/judgetypes', makeJudgeTypes(pgPool))
app.use('/meets', makeMeets(pgPool, sendMail))
app.use('/membership', makeMembership(pgPool))
app.use('/regions', makeRegions(pgPool))
app.use('/users', makeUsers(pgPool, redisClient))
app.use('/venues', makeVenues(pgPool))
app.use('/thor', makeThor(sqlConnection))

app.get('/user', (req, res) => {
  if (req.user) {
    return res.json(req.user)
  }

  return res.json()
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  logger.info('server running on port ' + port)
})
