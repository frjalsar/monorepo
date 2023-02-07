
import express from 'express'
import compression from 'compression'
import  bodyParser from 'body-parser'
import  helmet  from 'helmet'
import cors from 'cors'

export function createApp (isProduction) {
  const app = express()

  if (isProduction) {
    app.use(compression())
    app.use(helmet({
      contentSecurityPolicy: false
    }))
  }

  app.use(cors({
    origin: true,
    credentials: true
  }))
  app.use(bodyParser.json({ limit: '40mb' }))
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

  return app
}

