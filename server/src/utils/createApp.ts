import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import express, { Express, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import { logError } from '../middleware/error/logError'
import { returnError } from '../middleware/error/returnError'
import sessionsRouter from '../routes/sessions'
import feedbackRouter from '../routes/feedback'

export function createApp(): Express {
  const app: Express = express()
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  // app.use('/sessions', sessionsRouter)
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript server running')
  })
  app.use('/', sessionsRouter)
  app.use('/', feedbackRouter)
  app.use(logError)
  app.use(returnError)
  return app
}
