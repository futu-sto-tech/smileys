import { AxiosRequestConfig } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { GifId, GifResult, User, UserGifsByIdMap } from '../../types/types'
import { GIPHY_URLS } from '../../consts/urls'
import { GIPHY } from '../../consts/gifs'
import { handleAxiosMethodGiphy } from '../../utils/handleAxiosMethod'

const { API_KEY, LIMIT, RATING, LANGUAGE } = GIPHY

export function useGetGifs(feedback: { message: string; feedback: string }): UseQueryResult<UserGifsByIdMap> {
  return useQuery(['gifIds', feedback], async () => {
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: GIPHY_URLS.GIPHY_BASE_URL,
      data: feedback,
    }

    const res = await handleAxiosMethodGiphy<{ data: GifResult[] }>(requestConfig)
    const gifResult = res.data

    ids.forEach((id, i) => {
      userGifByIdMap.set(id, gifResult[i])
    })

    return userGifByIdMap
  })
}
