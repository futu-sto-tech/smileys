import { Schema, model } from 'mongoose'

const feedbackSchema = new Schema({
  mail: String,
  feedback: String,
  createDate: {
    type: Date,
    default: Date.now,
  },
})

export const FeedbackModel = model('Feedback', feedbackSchema)
