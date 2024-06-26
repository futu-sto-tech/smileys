import { StatusCodes } from 'http-status-codes'

export class BaseError extends Error {
  constructor(
    public message: string,
    public isOperational: boolean = true,
    public log: any,
    public statusCode: number
  ) {
    super(message)
    this.name = this.constructor.name
  }

  getClientError = () => {
    return {
      type: this.name,
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}

export class Error400 extends BaseError {
  constructor(message?: string, isOperational?: boolean, log?: any) {
    super(message || 'Bad request', isOperational, log, StatusCodes.BAD_REQUEST)
  }
}

export class Error500 extends BaseError {
  constructor(message?: string, isOperational?: boolean, log?: any) {
    super(message || 'Internal Server Error', isOperational, log, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}
