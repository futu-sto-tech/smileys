import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { useQueryClient } from 'react-query'
import { GifResult } from '../../types/types'
import styles from './SelectGifPage.module.scss'
import { Button } from '../../components/Button'
// import GifFetcher from '../../components/GifFetcher'
import { IAppProvider } from '../../types/AppContext'
import { useGifByIds } from '../../hooks/api/useGifByIds'

type Parameters = {
  roomId: string
  gifId: string
}

function SelectGifPage() {
  const { session, joinSession, user, updateSessionUser }: IAppProvider = useContext(AppContext)
  const { roomId, gifId } = useParams<keyof Parameters>() as Parameters
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isError, data: userGifMap, error, isFetching } = useGifByIds([{ ...user, gifId }])

  const activeGif = userGifMap?.get(gifId)

  return (
    <div className={styles.container}>
      <h1>Select this GIF?</h1>
      <p>Pick a GIF to share with your team during this week's smileys session</p>
      {/* Todo: */}
      {/* <GifFetcher gifId={gifId} /> */}
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
            updateSessionUser({ ...user, gifId })
            navigate(`/present/${roomId}`)
          }}
        >
          Choose Gif
        </Button>
      </div>
    </div>
  )
}

export default SelectGifPage
