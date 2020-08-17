import{ Schema, model, Document, Model } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { APP_SECRET, APP_ORIGIN, BRCYPT_WORK_FACTOR, EMAIL_VERIFICATION_TIMEOUT } from '../config'
import { createHash, createHmac, timingSafeEqual } from 'crypto'

export interface UserDocument extends Document {
	email: string
	name: string
	password: string
	verifiedAt: Date
	matchesPassword: (password: string) => Promise<boolean>
	verificationUrl: () => string
}

interface UserModel extends Model<UserDocument> {
	signVerificationUrl: (url: string) => string
	hasValidVerificationUrl: (path: string, query: any) => boolean
}

const userSchema = new Schema({
	email: String,
	name: String,
	password: String,
	verifiedAt: Date
}, {
	timestamps: true
})

userSchema.pre<UserDocument>('save', async function () {
	console.log('In the presave hook!')
	if (this.isModified('password')) {
		this.password = await hash(this.password, BRCYPT_WORK_FACTOR)
	}
})

userSchema.methods.matchesPassword = function (password: string) {
	return compare(password, this.password)
}

// ? Generate a URI_FOR_EMAIL_VERIFICATION
userSchema.methods.verificationUrl = function () {
	const token = createHash('sha1').update(this.email).digest('hex')
	const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT
  
	const url = `${APP_ORIGIN}/email/verify?id=${this.id}&token=${token}&expires=${expires}`
	const signature = User.signVerificationUrl(url)
  
	return `${url}&signature=${signature}`
}

// ? Sign the token generated the verifivation email
userSchema.statics.signVerificationUrl = (url: string) =>
  createHmac('sha256', APP_SECRET).update(url).digest('hex')

// ? Verify the verification Url
userSchema.statics.hasValidVerificationUrl = (path: string, query: any) => {
const url = `${APP_ORIGIN}${path}`
const original = url.slice(0, url.lastIndexOf('&'))
const signature = User.signVerificationUrl(original)

return timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) && +query.expires > Date.now()
}

// * a hook to chnage the behaviour of transform method
userSchema.set('toJSON', {
	transform: (doc, { __v, password, ...rest }, options) => rest
  })

export const User = model<UserDocument, UserModel>('User', userSchema)