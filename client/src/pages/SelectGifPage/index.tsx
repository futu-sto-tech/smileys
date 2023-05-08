import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { useGifById } from '../../shared/gif_api'
import { useQueryClient } from 'react-query'
import { TrendingGifs } from '../../components/TrendingGifs'
import { Gif } from '../../components/Gif'
import { GifResult } from '../../types/types'
import styles from './SelectGifPage.module.scss'
import { Button } from '../../components/Button'
import GifFetcher from '../../components/GifFetcher'
import { IAppProvider } from '../../types/AppContext'

type Parameters = {
  roomId: string
  gifId: string
}

function SelectGifPage() {
  const { session, joinSession, user, updateSessionUser }: IAppProvider = useContext(AppContext)
  const { roomId, gifId } = useParams<keyof Parameters>() as Parameters
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const cachedGifData = queryClient.getQueryData<GifResult[]>('trendingGifs')

  useEffect(() => {
    if (!session) joinSession(roomId)
  }, [])

  return (
    <div className={styles.container}>
      <h1>Select this GIF?</h1>
      <p>Pick a GIF to share with your team during this week's smileys session</p>
      <GifFetcher gifId={gifId} />
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
          }}
        >
          Choose Gif
        </Button>
      </div>
    </div>
  )
}

export default SelectGifPage
