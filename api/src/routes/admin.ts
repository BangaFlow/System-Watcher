import { settingsSchema } from './../validations/settings';
import { Settings } from './../models/Settings';
import { Router } from 'express'
import { admin, auth, catchAsync } from '../middleware'
import { validate } from '../validations'
import { red } from 'chalk';

const router = Router()
const warn = red

router.get('/settings', auth, admin, catchAsync(async (req, res) => {
    const settings = await Settings.findOne().exec()

    if (settings) {
        res.json(settings)
    } else {
        res.json({ message: 'No settings were found at the moment.' })
    }
}))

// * update API settings
router.put('/settings', auth, admin, catchAsync(async (req, res) => {
    await validate(settingsSchema, req.body)
   
    await Settings.findByIdAndUpdate(
        req.body.id,
        req.body,
        { useFindAndModify: false })
        .then( (doc) => {
          res.status(202).json(doc)
        })
        .catch((err) => {
     // Mongoose Validation Error/s
              Object.entries(err.errors).map(([key, value]) => {
                  // @ts-ignore
                console.log(warn(value.message))
              })
             res.status(422).json(err)
            }
        )
    
    res.json({ message: 'OK'})
}))

export default router