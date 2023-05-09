import { AxiosError } from 'axios'
import { IServerError } from './responseData'

export class ServerError extends Error {
  constructor(public message: string = 'Server Error', public statusCode?: number, public type?: string | null) {
    super(message)
    this.message = message || 'Server Error'
    this.type = type || null
    this.statusCode = statusCode || 500
  }

  fromAxios = (axiosError: AxiosError<IServerError>): ServerError | Error => {
    const { response, message } = axiosError
    if (!(axiosError instanceof AxiosError) || !response) throw Error('Axios call does not return axios error')

    // Request never received a response with data
    const { data } = response
    if (!data) return new Error(message)

    // Request received a response
    const { error, statusCode, type } = data
    return new ServerError(error, statusCode, type)
  }

  getError = () => {
    return {
      type: this.type,
      error: this.message,
      statusCode: this.statusCode,
    }
  }
}
