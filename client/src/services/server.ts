import { AxiosRequestConfig } from 'axios'
import { SERVER_URLS } from '../consts/urls'
import { handleAxiosMethod } from '../utils/handleAxiosMethod'
import { Session } from '../types/types'
import { ApiError, ServerError } from '../types/errors'

export const checkIfSessionExists = async (roomId: string): Promise<{ err: ApiError | null; data: Session | null }> => {
  const requestConfig: AxiosRequestConfig = {
    method: 'post',
    url: SERVER_URLS.SESSION_EXISTS,
    data: roomId,
  }

  const res = await handleAxiosMethod<Session>(requestConfig)
  return res
}