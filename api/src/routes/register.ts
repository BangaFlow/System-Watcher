import { registerSchema, validate } from './../validations'
import { Router } from 'express'
import { User } from '../models'
import { logIn } from '../auth'
import { guest, catchAsync } from '../middleware'
import { BadRequest } from '../errors'

const router = Router()

router.post('/register', guest, catchAsync(async (req, res) => {

	await validate(registerSchema, req.body)

	const { name, email, password } = req.body

	const found = await User.exists({ email })

	if (found) {
		throw new BadRequest('Invalid Email')
	}

	const user = await User.create({ name, email, password })

	logIn(req, user.id)
		
    res.status(202).json({ message: 'Ok' })
}))

export default router 