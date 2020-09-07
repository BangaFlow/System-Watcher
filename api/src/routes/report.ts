import { Unauthorized } from './../errors'
import { Router } from 'express'
import { catchAsync } from '../middleware'
import { Report } from '../models'


const router = Router()

router.post('/report/add', /* auth, */ catchAsync(async (req, res) => {
   
    const { type, userLocationText, agencyLocationText, userCoord, agencyCoord } = req.body
   
    const report = await Report.findOne().sort({ _id: -1 })

    const now = new Date()
    //@ts-ignore
    const delay = now.getTime() - report.createdAt.getTime()
    const THIRD = 1000 * 60 * 20
    
    if (report && delay <= THIRD) {
        throw new Unauthorized('You can\'t add a new report untill 20 minutes is passed!')
    }
    
    await Report.create({ type, userLocationText, agencyLocationText, userCoord, agencyCoord})
    
    res.json({ message: 'OK'})
}))

export default router