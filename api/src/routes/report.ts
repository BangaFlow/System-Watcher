import { Settings } from './../models/Settings';
import { Unauthorized } from './../errors'
import { Router } from 'express'
import { auth, catchAsync } from '../middleware'
import { Report } from '../models'
import { reportIdSchema, reportSchema, validate } from '../validations'


const router = Router()

router.get('/report', catchAsync(async (req, res) => {
    const reports = await Report.find({}, '-user').sort('-createdAt').exec()

    if (reports) {
        res.json(reports)
    } else {
        res.json({ message: 'No reports were found at the moment.' })
    }
}))

router.post('/report', auth, catchAsync(async (req, res) => {
    await validate(reportIdSchema, req.body)

    const { id } = req.body
    
    const report = await Report.findById(id).exec()

    if (report) {
        res.json(report)
    } else {
        res.json({ message: 'No report was found.' })
    }
}))

router.post('/report/add', auth, catchAsync(async (req, res) => {
    await validate(reportSchema, req.body)
   
    const { type, userLocationText, agencyLocationText, userCoord, agencyCoord, distance, user } = req.body
   // this is in general => per user
    const report = await Report.findOne({user}).sort({ _id: -1 })
    const settings = await Settings.findOne().exec()

    if(report && settings) {
        const now = new Date()
        //@ts-ignore
        const delay = now.getTime() - report.createdAt.getTime()
        const THIRD = 1000 * 60 * settings.holdTime
        
        if (report && delay <= THIRD) {
            throw new Unauthorized(`You can\'t add a new report untill ${settings.holdTime} minutes is passed!`)
        }
    }
    
    await Report.create({ type, userLocationText, agencyLocationText, userCoord, agencyCoord, distance, user})
    
    res.json({ message: 'OK'})
}))

export default router