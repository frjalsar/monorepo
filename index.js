const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Custom modules
const athleteRoute = require('./athletes/route')
const clubRoute = require('./clubs/route')
const regionRoute = require('./regions/route')

const app = express()
app.use(cors()) // All sites, fix before launch
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use('/athletes', athleteRoute)
app.use('/clubs', clubRoute)
app.use('/regions', regionRoute)

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log('App listening on port ' + app.get('port')))
