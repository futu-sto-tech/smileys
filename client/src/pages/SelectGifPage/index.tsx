import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext, { AppProviders } from '../../shared/AppContext'
import { useGifById } from '../../shared/gif_api'
import { useQueryClient } from 'react-query'
import { TrendingGifs } from '../../components/TrendingGifs'
import { Gif } from '../../components/Gif'
import { GifResult } from '../../@types/types'
import styles from './SelectGifPage.module.scss'
import { Button } from '../../components/Button'

type Parameters = {
  roomId: string
  gifId: string
}

function SelectGifPage() {
  const { session, joinSession, user }: AppProviders = useContext(AppContext)
  const { roomId, gifId } = useParams<keyof Parameters>() as Parameters
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const cachedGifData = queryClient.getQueryData<GifResult[]>('trendingGifs')

  useEffect(() => {
    console.log({ session, user })

    if (!session) joinSession(roomId)
  }, [])

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
        <div className={styles.container}>
          <h1>Select this GIF?</h1>
          <p>Pick a GIF to share with your team during this week's smileys session</p>
          <Gif url={url}></Gif>
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
              onClick={(e) => {
                // TODO
              }}
            >
              {' '}
              Choose Gif
            </Button>
          </div>
        </div>
      ) : (
        <p>Oops Couldn't find your gif</p>
      )}
    </div>
  )
}

export default SelectGifPage
