export interface IServerError {
  message: string
  statusCode: number
  type: string
}

export interface Response<T> {
  statusCode: number
  body: IServerError | T
}
