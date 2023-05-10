import { AxiosRequestConfig } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { GifResult } from '../../types/types'
import { GIPHY } from '../../consts/gifs'
import { GIPHY_URLS } from '../../consts/urls'
import { handleAxiosMethod } from '../../utils/handleAxiosMethod'

const { API_KEY, LIMIT, RATING, LANGUAGE } = GIPHY

export function useSearchGifs(search: string): UseQueryResult<GifResult[]> {
  return useQuery(['searchGif', search], async () => {
    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      url: GIPHY_URLS.GIPHY_BASE_URL,
      params: {
        limit: LIMIT,
        rating: RATING,
        q: search,
        lang: LANGUAGE,
        api_key: API_KEY,
      },
    }

    const res = await handleAxiosMethod<{ data: GifResult[] }>(requestConfig)
    console.log(res.data)
    return res.data
  })
}
