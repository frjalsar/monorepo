require('dotenv').config()

const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authorize = require('./auth/authorize')

// Routes
const athleteRoute = require('./athletes/route')
const clubRoute = require('./clubs/route')
const regionRoute = require('./regions/route')
const passesRoute = require('./passes/route')
const loginRoute = require('./auth/route')

const app = express()
app.use(compression())
/*
const whitelist = [
  'http://icelandathletics.local:1234',
  'https://icelandathletics-membership.herokuapp.com'
]
*/
app.use(cors()) // All sites, fix before launch
app.use(cookieParser())
app.use(bodyParser.json({ limit: '40mb' }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use('/login', loginRoute)
app.use('/athletes', authorize(), athleteRoute)
app.use('/clubs', clubRoute)
app.use('/regions', authorize(), regionRoute)
app.use('/passes', authorize(), passesRoute)

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log('App listening on port ' + app.get('port')))
