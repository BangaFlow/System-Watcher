import { Joi } from './joi'

const apiKey = Joi.string().min(4).max(128).required()
const	radius =  Joi.number().max(10000).required()
const distance = Joi.number().max(100).required()
const holdTime = Joi.number().max(60).required()

export const settingsSchema = Joi.object({
  apiKey,
  radius,
  distance,
  holdTime
})
