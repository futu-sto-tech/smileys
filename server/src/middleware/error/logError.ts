import { NextFunction, Request, Response } from 'express'
import { errIsOperational } from '../../utils/error/errorTypeCheck'
import { BaseError } from '../../types/error'
import { ENVIRONMENT } from '../../consts'

export const logError = (err: Error | BaseError, _: Request, __: Response, next: NextFunction) => {
  const isOperational = errIsOperational(err)

  if (isOperational) {
    console.log('----- OPERATIONAL ERROR -----')
    console.log(err)
    return next(err)
  }

  console.log('----- PROGRAMMER ERROR -----')
  console.log(err)
  next(err)
}
