const Joi = require('joi')

const email = Joi.string().email().required().label('Email')

const username = Joi.string().alphanum().min(4).max(30).required().label('Username')

// const name = Joi.string().max(254).required().label('Name')

const password = Joi.string().label('Password').ruleset.pattern(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/, 'regexPassword').message('Password must have at least one lowercase letter, one uppercase letter, one digit and one special character.')

const signUp = Joi.object({
    email, username, password // ,name
})

const signIn = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
})

module.exports = { signIn, signUp}