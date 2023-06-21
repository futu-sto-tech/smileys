import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import styles from './index.module.scss'
import { Button } from '../../components/Button'
import { IAppProvider } from '../../types/AppContext'
import { useGetGifs } from '../../hooks/api/useGetGifs'

type Parameters = {
  roomId: string
  gifId: string
}

function SelectGifPage() {
  const { user, updateSessionUser }: IAppProvider = useContext(AppContext)
  const { roomId, gifId } = useParams<keyof Parameters>() as Parameters
  const navigate = useNavigate()
  const { isError, data: userGifMap, error, isFetching } = useGetGifs([{ ...user, gifId }])

  const activeGif = userGifMap?.get(gifId)
  const gifThumbnailUrl = activeGif?.images['480w_still'].url || ''

  return (
    <div className={styles.container}>
      <h1>Select this GIF?</h1>
      <p>Pick a GIF to share with your team during this week's smileys session</p>
      {!isFetching &&
        activeGif &&
        (activeGif.images.original.width / activeGif.images.original.height < 2 ? (
          <img src={activeGif.images.original.url} height={500} className={styles.gif} />
        ) : (
          <img src={activeGif.images.original.url} width={1000} className={styles.gif} />
        ))}
      <div className={styles.buttons}>
        <Button
          className={styles.rightButton}
          onClick={(e) => {
            navigate(-1)
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            updateSessionUser({ ...user, gifId, gifThumbnailUrl })
            navigate(`/${roomId}`)
          }}
        >
          Choose Gif
        </Button>
      </div>
    </div>
  )
}

export default SelectGifPage
