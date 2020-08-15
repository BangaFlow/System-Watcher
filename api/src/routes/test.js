const { red } = require('chalk')
const  Router  = require('express')
const  User  = require('../models/User.js')
const { signUp } = require('../validations/user')
const warn = red
const router = Router()

// * Returns All users
router.get('/', async function (req, res) {
    const users = await User.find({}, (err, doc) => {
        if (err) {
            console.log(err.message)
        }
    })
    return res.json(users)
})

// * Create new user after validation
router.post('/', async function (req, res) {

  // We use then & catch instead of const {error, value} because we want to catch mongoose errors too.
  await signUp.validateAsync(req.body, {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  })
  .then(async (value) => {
    const user = await User.create(value)
    res.status(202).json(user)
  })
  .catch( (err) => {
    
    // Joi validation Error
    if (err.details) {
      console.log(`Validation error: ${warn(err.details.map((x) => x.message).join('. '))}`)
    } else { // Mongoose Validation Error/s
      Object.entries(err.errors).map(([key, value]) => {
        console.log(warn(value.message))
      })
    }
     res.status(422).json(err)
    })
})

// * Delete a user
router.delete('/', async (req, res) => {
            
    const user = await User.findByIdAndDelete(req.body.id)
    res.status(202).json(user)
})

// * Update a user 
router.put('/', async (req, res) => {
    await User.findByIdAndUpdate(
    req.body.id,
    req.body,
    { runValidators: true, useFindAndModify: false })
    .then( (doc) => {
      res.status(202).json(doc)
    })
    .catch((err) => {
 // Mongoose Validation Error/s
          Object.entries(err.errors).map(([key, value]) => {
            console.log(warn(value.message))
          })
         res.status(422).json(err)
        }
    )
})

module.exports =  router