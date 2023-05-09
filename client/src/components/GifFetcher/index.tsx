import { useQueryClient } from 'react-query'
import { Gif } from '../../components/Gif'
import { GifResult } from '../../types/types'
import { useGifById } from '../../hooks/api/useGifById'

function GifFetcher({ gifId }: { gifId: string }) {
  const queryClient = useQueryClient()
  const cachedGifData = queryClient.getQueryData<GifResult[]>('GifList')

  let url
  if (cachedGifData) {
    url = cachedGifData.find((gifResult) => {
      return gifResult.id == gifId
    })?.images.original.url
  }

  if (!url) {
    const { status, data, error, isFetching } = useGifById(gifId)
    if (data) url = data.images.original.url
  }
  return (
    <div>
      {url ? (
        <div>
          <Gif url={url}></Gif>
        </div>
      ) : (
        <div>oops couldnt find your gif</div>
      )}
    </div>
  )
}

export default GifFetcher
