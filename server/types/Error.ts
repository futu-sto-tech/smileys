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

export class Socket400Error extends BaseError {
  constructor(message?: string, isOperational?: boolean, log?: any) {
    super(message || 'Bad request.', isOperational, log, StatusCodes.BAD_REQUEST)
  }
}
