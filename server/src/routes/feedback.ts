import { Router, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { FeedbackModel } from '../models/feedback'

const rootRouter = Router()

rootRouter.post('/feedback', async (req: Request, res: Response) => {
  if (!(req.body.feedback && typeof req.body.feedback === 'string' && typeof req.body.mail === 'string')) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad Request' })
  } else {
    const feedback = new FeedbackModel(req.body)
    try {
      const newFeedback = await feedback.save()
      res.status(StatusCodes.OK).json(newFeedback)
    } catch (e: any) {
      res.status(StatusCodes.SERVICE_UNAVAILABLE).json(e.message)
    }
  }
})

export default rootRouter
