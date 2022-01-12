
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const enforceHttps = require('express-sslify').HTTPS
const cors = require('cors')
const makeAuthorize = require('../auth/authorize')
const corsOrigin = require('../auth/corsOrigin')
const { attachCookies } = require('superagent')

function createService (pgPool, redisClient, sqlConnection, jiraConfig, logger) {
  const authorize = makeAuthorize(redisClient, logger)

  // Routes
  const makeAthleteRoute = require('../routes/athletes')
  const makeClubRoute = require('../routes/clubs')
  const makeRegionRoute = require('../routes/regions')
  const makeMembershipRoute = require('../routes/membership')
  const makeThorRoute = require('../routes/thor')
  const makeJiraRoute = require('../routes/jira')
  const makeJudgesRoute = require('../routes/judges')
  const makeVenuesRoute = require('../routes/venues')
  const makeEventsRoute = require('../routes/events')
  // const makePassesRoute = require('../passes/route')
  const makeLoginRoute = require('../routes/user')
  const app = express()

  if (process.env.NODE_ENV === 'production') {
    app.use(enforceHttps({
      trustProtoHeader: true
    }))
    app.use(compression())
    app.use(helmet())
  }

  app.use(cors({
    origin: corsOrigin(),
    credentials: true
  }))

  app.post(
    '/islogin',
    bodyParser.raw({
      type: () => true,
      limit: '100mb',
    }),
    (req, res, next) => {      
      console.log('buffer', req.body)
      console.log('text', Buffer.from(req.body).toString('utf-8'))
      res.send('ok')
  })

  app.use(bodyParser.json({ limit: '40mb' }))
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
  
  app.use(authorize())
  app.use('/user', makeLoginRoute(pgPool, redisClient, logger))
  app.use('/athletes', makeAthleteRoute(pgPool))
  app.use('/clubs', makeClubRoute(pgPool))
  app.use('/regions', makeRegionRoute(pgPool))
  app.use('/membership', makeMembershipRoute(pgPool))
  app.use('/thor', makeThorRoute(sqlConnection, logger))
  app.use('/jira', makeJiraRoute(jiraConfig))
  app.use('/judges', makeJudgesRoute(pgPool))
  app.use('/venues', makeVenuesRoute(pgPool))
  app.use('/events', makeEventsRoute(pgPool))  
  // app.use('/passes', makePassesRoute(pgPool))

  return app
}

module.exports = createService
