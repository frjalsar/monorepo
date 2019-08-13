require('dotenv').config()

const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const enforceHttps = require('express-sslify').HTTPS
const cors = require('cors')

const authorize = require('./auth/authorize')

// Routes
const athleteRoute = require('./athletes/route')
const clubRoute = require('./clubs/route')
const regionRoute = require('./regions/route')
const passesRoute = require('./passes/route')
const loginRoute = require('./auth/route')
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

app.use('/login', loginRoute)
app.use('/athletes', authorize(), athleteRoute)
app.use('/clubs', clubRoute)
app.use('/regions', authorize(), regionRoute)
app.use('/passes', authorize(), passesRoute)

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log('App listening on port ' + app.get('port')))
