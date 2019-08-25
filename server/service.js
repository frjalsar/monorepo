
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const enforceHttps = require('express-sslify').HTTPS
const cors = require('cors')
const makeAuthorize = require('../auth/authorize')

function createService (pgPool, redisClient) {
  const authorize = makeAuthorize(redisClient)

  // Routes
  const makeAthleteRoute = require('../routes/athletes')
  const makeClubRoute = require('../routes/clubs')
  const makeRegionRoute = require('../routes/regions')
  // const makePassesRoute = require('../passes/route')
  const makeLoginRoute = require('../routes/login')
  const app = express()

  if (process.env.NODE_ENV === 'production') {
    app.use(enforceHttps({
      trustProtoHeader: true
    }))
    app.use(compression())
    app.use(helmet())
  }

  const whitelist = [
    'http://local.fri.is:1234',
    'http://local.fri.is:3010',
    'https://felagatal.fri.is'
  ]
  app.use(cors({
    origin: (origin, cb) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        cb(null, true)
      } else {
        cb(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  }))

  app.use(bodyParser.json({ limit: '40mb' }))
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

  app.use('/login', makeLoginRoute(pgPool, redisClient))
  app.use('/athletes', authorize(), makeAthleteRoute(pgPool))
  app.use('/clubs', authorize(), makeClubRoute(pgPool))
  app.use('/regions', authorize(), makeRegionRoute(pgPool))
  // app.use('/passes', makePassesRoute(pgPool))

  return app
}

module.exports = createService
