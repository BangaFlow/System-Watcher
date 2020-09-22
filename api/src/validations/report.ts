import { Joi } from './joi'

const address = {
  lat: Joi.number().min(-90).max(90).required(), 
  lng: Joi.number().min(-180).max(180).required()
}

const type = Joi.string().min(4).max(128).required()
const	userLocationText =  Joi.string().min(8).max(128).required()
const agencyLocationText = Joi.string().min(8).max(128).required()
const userCoord = address
const agencyCoord = address
const distance = Joi.number().max(50).required()
const user = Joi.objectId().required()

export const reportSchema = Joi.object({
  type,
  userLocationText,
  agencyLocationText,
  userCoord,
  agencyCoord,
  distance,
  user
})

const id = Joi.objectId().required()

export const reportIdSchema = Joi.object({
  id
})
