import axios, { AxiosRequestConfig } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { GifResult, User } from '../../types/types'
import { GIPHY_URLS } from '../../consts/urls'
import { GIPHY } from '../../consts/gifs'
import { handleAxiosMethod } from '../../utils/handleAxiosMethod'

const { API_KEY, LIMIT, RATING, LANGUAGE } = GIPHY

type GifId = string
type UserGifByIdMap = Map<GifId, GifResult>

export function useGifByIds(users: User[]): UseQueryResult<UserGifByIdMap> {
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

    const res = await handleAxiosMethod<{ data: GifResult[] }>(requestConfig)
    const gifResult = res?.data

    ids.forEach((id, i) => {
      userGifByIdMap.set(id, gifResult[i])
    })

    return userGifByIdMap
  })
}
