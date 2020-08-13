const express = require('express')
const router = express.Router()
const chalk = require('chalk')
const Joi = require('joi')
const User =  require('../models/User')
const { signUp, signIn } = require('../validations/user')

const warn = chalk.red

// Returns All users
router.get('/', async function (req, res) {
    const users = await User.find({}, (err, doc) => {
        if (err) {
            console.log(err.message)
        }
        console.log(doc)
    })
    return res.json(users)
})

// Create new user after validation
router.post('/', async function (req, res) {

  await signUp.validateAsync(req.body)
  .then(async (value) => {
    const user = await User.create(value)
    res.status(202).json(user)
  })
  .catch( err => {
    
    // Joi validation Error
    if (err.details) {
      console.log(warn(err.details[0].message))
    } else { // Mongoose Validation Error/s
      Object.entries(err.errors).map(([key, value]) => {
        console.log(warn(value.message))
      })
    }
     res.status(422).json(err)
    })
})

module.exports = router