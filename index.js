const express = require('express')
const bodyParser = require('body-parser')

// Custom modules
const athleteRoute = require('./athletes/route')
const clubRoute = require('./clubs/route')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use('/athletes', athleteRoute)
app.use('/clubs', clubRoute)

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log('App listening on port ' + app.get('port')))
