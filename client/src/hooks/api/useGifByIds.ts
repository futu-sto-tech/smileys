import axios, { AxiosRequestConfig } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { GifResult } from '../../types/types'
import { GIPHY_URLS } from '../../consts/urls'
import { GIPHY } from '../../consts/gifs'
import { handleAxiosMethod } from '../../utils/handleAxiosMethod'

const { API_KEY, LIMIT, RATING, LANGUAGE } = GIPHY

export function useGifByIds(ids: string[]): UseQueryResult<GifResult[]> {
  return useQuery(['gifIds', ids], async () => {
    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      url: GIPHY_URLS.GIPHY_BASE_URL,
      params: {
        limit: LIMIT,
        rating: RATING,
        ids: ids.toString(),
        lang: LANGUAGE,
        api_key: API_KEY,
      },
    }

    const res = await handleAxiosMethod<{ data: GifResult[] }>(requestConfig)
    console.log(res.data)
    return res.data
  })
}
