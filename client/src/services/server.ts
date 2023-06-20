import { AxiosRequestConfig } from 'axios'
import { SERVER_URLS } from '../consts/urls'
import { handleAxiosMethod } from '../utils/handleAxiosMethod'
import { Session } from '../types/types'
import { ApiError } from '../types/errors'

export const checkIfSessionExists = async (roomId: string): Promise<{ err: ApiError | null; data: boolean | null }> => {
  const requestConfig: AxiosRequestConfig = {
    method: 'post',
    url: SERVER_URLS.SESSION_EXISTS,
    data: roomId,
  }

  const res = await handleAxiosMethod<boolean>(requestConfig)
  return res
}
