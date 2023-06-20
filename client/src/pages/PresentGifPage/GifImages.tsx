import { GifResult, UserGifsByIdMap } from '../../types/types'
import styles from './GifImages.module.scss'

interface GifImagesProps {
  userGifsByIdMap?: UserGifsByIdMap
  activeGif?: GifResult
}

function GifImages({ userGifsByIdMap, activeGif }: GifImagesProps) {
  if (!userGifsByIdMap) return null
  const gifs = Array.from(userGifsByIdMap.values())
  const isActiveGif = (gif: GifResult) => gif.id === activeGif?.id

  return (
    <div className={styles.gifContainer}>
      <div className={styles.gifWrapper}>
        {gifs.map((gif) => (
          <img
            height={'430px'}
            width={'800px'}
            src={gif.images.original.url}
            className={`${styles.gif} ${isActiveGif(gif) ? '' : 'opacity-0'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default GifImages
