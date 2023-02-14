import * as dotenv from 'dotenv'
import pg from 'pg'
import sql from 'mssql'
import redis from 'redis'
import { pino } from 'pino'
import pinoHTTP from 'pino-http'
import { createApp } from './app'
import { makeAgeGroups } from '../composition/agegroups'
import { makeAuthenticate } from '../composition/authenticate'
import { makeAthletes } from '../composition/athletes'
import { makeClubs } from '../composition/clubs'
import { makeCompetitions } from '../composition/competitions'
import { makeEquipment } from '../composition/equipment'
import { makeEvents } from '../composition/events'
import { makeEventTypes } from '../composition/eventtypes'
import { makeJudges } from '../composition/judges'
import { makeJudgeTypes } from '../composition/judgetypes'
import { makeMeets } from '../composition/meets'
import { makeLogin } from '../composition/login'
import { makeMembership } from '../composition/membership'
import { makeRegions } from '../composition/regions'
import { makeUsers } from '../composition/users'
import { makeVenues } from '../composition/venues'
import { makeThor } from '../composition/thor'
import { makeRegistrations } from '../composition/registrations'
import { makeSendMail } from '../lib/sendmail'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

const logger = pino({
  name: 'api-service',
  level: 'debug'
})

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

const sendMail = makeSendMail(process.env.MAILGUN_API_KEY, process.env.MAILGUN_DOMAIN)
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
app.use('/events', makeEvents(pgPool))
app.use('/eventtypes', makeEventTypes(pgPool))
app.use('/judges', makeJudges(pgPool))
app.use('/judgetypes', makeJudgeTypes(pgPool))
app.use('/meets', makeMeets(pgPool, sendMail))
app.use('/membership', makeMembership(pgPool))
app.use('/regions', makeRegions(pgPool))
app.use('/users', makeUsers(pgPool, redisClient))
app.use('/venues', makeVenues(pgPool))
app.use('/thor', makeThor(sqlConnection))
app.use('/registrations', makeRegistrations(pgPool))

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
