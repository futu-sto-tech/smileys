import axios, { AxiosRequestConfig } from 'axios'
import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query'
import { GiphyResult } from '../../types/types'
import { GIPHY } from '../../consts/gifs'
import { GIPHY_URLS } from '../../consts/urls'
import { handleAxiosMethod } from '../../utils/handleAxiosMethod'

const { API_KEY, LIMIT, RATING, LANGUAGE } = GIPHY
const { GIPHY_BASE_URL_TRENDING } = GIPHY_URLS

export function useTrendingGifs(): UseInfiniteQueryResult<GiphyResult> {
  return useInfiniteQuery(
    'trendingGifs',
    async ({ pageParam }) => {
      const requestConfig: AxiosRequestConfig = {
        method: 'get',
        url: GIPHY_BASE_URL_TRENDING,
        params: {
          limit: LIMIT,
          rating: RATING,
          lang: LANGUAGE,
          api_key: API_KEY,
          offset: pageParam ? pageParam.count + pageParam.offset : 0,
        },
      }

      const res = await handleAxiosMethod<GiphyResult>(requestConfig)
      return res
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.offset === lastPage.pagination.total_count ? undefined : lastPage.pagination
      },
    }
  )
}
