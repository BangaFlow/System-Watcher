import{ Schema, model, Document } from 'mongoose'

export interface SettingsDocument extends Document {
	apiKey: string
	distance: number
	radius: number
	holdTime: number
}

const settingsSchema = new Schema({
	apiKey: String,
	distance: Number,
	radius: Number,
	holdTime: Number
}, {
	timestamps: true
})

// // * a hook to change the behaviour of transform method
// reportSchema.set('toJSON', {
// 	transform: (doc, { __v, user, ...rest }, options) => rest
//   })

export const Settings = model<SettingsDocument>('Settings', settingsSchema)