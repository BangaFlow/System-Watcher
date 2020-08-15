import Joi from 'joi'
import { BCRYPT_MAX_BYTES } from '../config'

const email = Joi.string().email().min(8).max(254).lowercase().trim().required()

const name = Joi.string().min(3).max(128).required()

const password = Joi.string().min(8).max(BCRYPT_MAX_BYTES, 'utf8').required().regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u).message('"{#label}" must contain one uppercase letter, one lowercase letter and one digit.')

const passwordConfirmation = Joi.string().valid(Joi.ref('password')).required()

export const registerSchema = Joi.object({
    email,
    name,
    password,
    passwordConfirmation
})

export const logInShcema = Joi.object({
    email,
    password
})