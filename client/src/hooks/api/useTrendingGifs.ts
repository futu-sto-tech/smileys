import axios from 'axios'
import { useQuery } from 'react-query'
import { GifResult } from '../../types/types'
import { GIPHY } from '../../consts/gifs'

export function useTrendingGifs() {
  return useQuery('trendingGifs', async () => {
    const { data } = await axios.get<{ data: GifResult[] }>('https://api.giphy.com/v1/gifs/trending', {
      params: {
        api_key: import.meta.env.VITE_GIPHY_API_KEY,
        limit: GIPHY.LIMIT,
        rating: 'g',
      },
    })

    return data.data
  })
}
