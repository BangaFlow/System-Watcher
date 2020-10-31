import { Unauthorized } from './../errors'
import { Router } from 'express'
import { validate, logInShcema } from '../validations'
import { User } from '../models'
import { catchAsync, guest, auth } from '../middleware'
import { logIn, logOut } from '../auth'

const router = Router()

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(logInShcema, req.body)

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || !(await user.matchesPassword(password))) {
        throw new Unauthorized('Incorrect email or password')
    }

    logIn(req, user.id, user.role)
    // { message: 'OK'}
    res.json(user)
}))

router.post('/logout', auth, catchAsync(async (req, res) => {
    await logOut(req, res)

    res.json({ message: 'ok'})
}))

router.post('/stayActive', auth, catchAsync(async (req, res) => {

    res.json({ message: 'ok'})
}))

export default router