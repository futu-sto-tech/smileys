import axios, { AxiosRequestConfig } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { GifResult } from '../../types/types'
import { GIPHY_URLS } from '../../consts/urls'
import { GIPHY } from '../../consts/gifs'
import { handleAxiosMethod } from '../../utils/handleAxiosMethod'

const { API_KEY, LIMIT, RATING, LANGUAGE } = GIPHY

export function useGifById(ids: string[]): UseQueryResult<GifResult[]> {
  return useQuery(['gifIds', ids], async () => {
    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      url: GIPHY_URLS.GIPHY_BASE_URL,
      params: {
        limit: LIMIT,
        rating: RATING,
        ids: encodeURIComponent(ids.toString()),
        lang: LANGUAGE,
        api_key: API_KEY,
      },
    }

    const res = await handleAxiosMethod<{ data: GifResult[] }>(requestConfig)
    return res.data
  })
}
