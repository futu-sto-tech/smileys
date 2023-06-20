import { AxiosRequestConfig } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { GifId, GifResult, User, UserGifsByIdMap } from '../../types/types'
import { GIPHY_URLS } from '../../consts/urls'
import { GIPHY } from '../../consts/gifs'
import { handleAxiosMethodGiphy } from '../../utils/handleAxiosMethod'

const { API_KEY, LIMIT, RATING, LANGUAGE } = GIPHY

export function useGetGifs(users: User[]): UseQueryResult<UserGifsByIdMap> {
  const ids = users.filter((user) => user.gifId).map((user) => user.gifId)
  const userGifByIdMap = new Map<GifId, GifResult>()

  return useQuery(['gifIds', users], async () => {
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

    const res = await handleAxiosMethodGiphy<{ data: GifResult[] }>(requestConfig)
    const gifResult = res.data

    ids.forEach((id, i) => {
      userGifByIdMap.set(id, gifResult[i])
    })

    return userGifByIdMap
  })
}
