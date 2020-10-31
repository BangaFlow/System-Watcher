import express from 'express'
import session, { Store } from 'express-session'
import cors from 'cors'
import { SESSION_OPTIONS } from './config'
import { admin, register, login, home, verify, reset, report } from './routes'
import { serverError, notFound, active } from './middleware'

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
  }

export const createApp = (store: Store) => {
    
  const app = express()

  app.use(express.json())

  app.disable('x-powered-by')

  app.use(session({ ...SESSION_OPTIONS, store }))

  app.use(cors(corsOptions))

  app.use(active)

  app.use(admin)

  app.use(home)

  app.use(login)

  app.use(register)

  app.use(report)
  
  app.use(verify)

  app.use(reset)
  
  app.use(notFound)

  app.use(serverError)

  return app
}