import{ Schema, model, Document, Model } from 'mongoose'

export interface ReportDocument extends Document {
	type: string
	userLocationText: String
  agencyLocationText: String
  userCoord: {lat: Number, lng: Number}
  agencyCoord: {lat: Number, lng: Number}
  distance: Number,
  user: String
}

const reportSchema = new Schema({
	type: String,
	userLocationText: String,
  agencyLocationText: String,
  userCoord: {lat: Number, lng: Number},
  agencyCoord: {lat: Number, lng: Number},
  distance: Number,
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
	timestamps: true
})

// // * a hook to change the behaviour of transform method
// reportSchema.set('toJSON', {
// 	transform: (doc, { __v, user, ...rest }, options) => rest
//   })

export const Report = model<ReportDocument>('Report', reportSchema)