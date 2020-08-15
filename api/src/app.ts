import express from 'express'
import session, { Store } from 'express-session'
import cors from 'cors'
import { SESSION_OPTIONS } from './config'
import { register, login } from './routes'
import { serverError, notFound } from './middleware'

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

    app.use(login)

    app.use(register)
    
    app.use(notFound)

    app.use(serverError)
  
    return app
}