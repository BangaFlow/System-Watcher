const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const mongoose = require('mongoose')
require('dotenv').config()

const users = require('./routes/users')

const { PORT, DB_URI } = process.env

const success = chalk.bold.green
const warning = chalk.magentaBright

const app = express()

app.use(express.json())


mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log(success('Connected to Atlas!'))
}) 

app.disable('x-powered-by')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))

app.use('/api/users', users)

app.listen(PORT, 
  () => console.log(warning(`Server started and running on port ${PORT}.`))
)
