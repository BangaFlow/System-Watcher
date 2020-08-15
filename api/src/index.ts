import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import mongoose from 'mongoose'
import { green, magenta, red } from 'chalk'
import { REDIS_OPTIONS, APP_PORT } from './config'
import { MONGO_URI, MONGO_OPTIONS } from './config/db'
import { createApp } from './app'

const success = green
const warning = magenta

;(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS, ()=>{
    console.log(`[${red('Atlas')}] ${success('Connected!')}`)
  })

  const RedisStore = connectRedis(session)

  const client = new Redis(REDIS_OPTIONS)
  
  const store = new RedisStore({ client })

  client.on('error', console.log)
  client.on('ready', ()=> {
      console.log(`[${red('Redis')}] ${success('Connected!')}`)
  })

  const app = createApp(store)

  app.listen(APP_PORT, () => {
    console.log(`[${red('API')}] ${warning(`Runnin on port:${APP_PORT}`)}`) 
  })
})() 


