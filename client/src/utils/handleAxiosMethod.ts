import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ApiError, ServerError } from '../types/errors'

export const handleAxiosMethod = async <D>(
  axiosConfig: AxiosRequestConfig<D>
): Promise<{ err: ApiError | null; data: D | null }> => {
  try {
    const data = (await axios(axiosConfig)).data
    return { err: null, data }
  } catch (err: any) {
    const error = new ServerError(err.message).fromAxios(err)
    return { err: error, data: null }
  }
}

export const handleAxiosMethodGiphy = async <D>(axiosConfig: AxiosRequestConfig<D>): Promise<D> => {
  try {
    return (await axios(axiosConfig)).data
  } catch (err) {
    if (err instanceof AxiosError) throw new ServerError().fromAxios(err)
    throw new ServerError()
  }
}
