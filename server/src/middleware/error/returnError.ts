import { NextFunction, Request, Response } from 'express'
import { errIsOperational } from '../../utils/error/errorTypeCheck'
import { ENVIRONMENT } from '../../consts'
import { BaseError, Error500 } from '../../types/error'

export const returnError = (err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENVIRONMENT === 'DEVELOPMENT') {
    sendErrorToClient(res, err)
    return next()
  }

  if (res.headersSent || !errIsOperational(err)) {
    sendGenericError(res)
    return next()
  }

  sendErrorToClient(res, err)
  next()
}

const sendGenericError = (res: Response) => {
  const internalErr = new Error500()
  res.status(500).send(internalErr.getClientError())
}

const sendErrorToClient = (res: Response, err: Error | BaseError) => {
  if (err instanceof BaseError) res.status(err.statusCode || 500).send(err.getClientError() || 'Internal server error')
  else res.status(500).send('Internal server error')
}
