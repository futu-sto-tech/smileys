import axios, { AxiosRequestConfig } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { GifResult } from '../../types/types'
import { GIPHY } from '../../consts/gifs'
import { GIPHY_URLS } from '../../consts/urls'
import { handleAxiosMethod } from '../../utils/handleAxiosMethod'

const { API_KEY, LIMIT, RATING, LANGUAGE } = GIPHY
const { GIPHY_BASE_URL_TRENDING } = GIPHY_URLS

export function useTrendingGifs(): UseQueryResult<GifResult[]> {
  return useQuery(['trendingGifs'], async () => {
    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      url: GIPHY_BASE_URL_TRENDING,
      params: {
        limit: LIMIT,
        rating: RATING,
        lang: LANGUAGE,
        api_key: API_KEY,
      },
    }

    const res = await handleAxiosMethod<{ data: GifResult[] }>(requestConfig)
    return res.data
  })
}

// export function useTrendingGifs() {
//   return useQuery('trendingGifs', async () => {
//     const { data } = await axios.get<{ data: GifResult[] }>('https://api.giphy.com/v1/gifs/trending', {
//       params: {
//         api_key: import.meta.env.VITE_GIPHY_API_KEY,
//         limit: GIPHY.LIMIT,
//         rating: 'g',
//       },
//     })

//     return data.data
//   })
// }
