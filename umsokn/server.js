require('dotenv').config()
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const enforceHttps = require('express-sslify').HTTPS
const app = express()

const isProduction = process.env.NODE_ENV === 'production'

app.use((_, res, next) => {
  res.cookie(
    'FRI_API',
    process.env.FRI_API_TOKEN,
    {
      domain: '.fri.is',
      secure: isProduction,
      maxAge: 2147483647000,
      httpOnly: true,
      sameSite: true,
      path: '/'
    }
  )

  return next()
})

if (isProduction) {
  app.use(enforceHttps({
    trustProtoHeader: true
  }))
  app.use(compression())
  app.use(helmet({
    contentSecurityPolicy: false
  }))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use(express.static('dist', {
  maxAge: '1y'
}))

app.set('port', process.env.PORT || 3010)
app.listen(app.get('port'), () => {
  console.log('App listening on port ' + app.get('port'))
})
