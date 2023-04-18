import axios from 'axios'
import { useQuery } from 'react-query'
import { GifResult } from '../@types/types'

export function useTrendingGifs() {
  return useQuery('trendingGifs', async () => {
    const { data } = await axios.get<{ data: GifResult[] }>('https://api.giphy.com/v1/gifs/trending', {
      params: {
        api_key: 'ZLhReXEYgtn9NA5YUDEBWq7peGLWjHec',
        limit: 100,
        rating: 'g',
      },
    })
    return data.data
  })
}
