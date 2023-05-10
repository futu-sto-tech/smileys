import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ServerError } from '../types/errors'

export const handleAxiosMethod = async <D>(axiosConfig: AxiosRequestConfig<D>): Promise<D> => {
  try {
    return (await axios(axiosConfig)).data
  } catch (err) {
    if (err instanceof AxiosError) throw new ServerError().fromAxios(err)
    throw new ServerError()
  }
}
