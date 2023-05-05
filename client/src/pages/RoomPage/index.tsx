import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext, { AppProviders } from '../../shared/AppContext'
import { TrendingGifs } from '../../components/TrendingGifs'
import styles from './RoomPage.module.scss'
import Input from '../../components/Input'
import { NameForm } from '../../components/NameForm'
import { useGifById } from '../../shared/gif_api'
import { Gif } from '../../components/Gif'
import GifFetcher from '../../components/GifFetcher'

function RoomPage() {
  const { session, joinSession, needName, user }: AppProviders = useContext(AppContext)
  let { roomId } = useParams()

  useEffect(() => {
    !session && roomId && joinSession(roomId)
  }, [])

  if (needName) return <NameForm />

  // Temporary for demonstrating GIFS
  if (user.gifId && session) {
    return (
      <>
        {session.users.map((user, i) => {
          if (user.gifId) {
            return (
              <>
                <p>name: {user.name}</p>
                <GifFetcher gifId={user.gifId} />
              </>
            )
          }
          return <p>{user.name} is still choosing</p>
        })}
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {session &&
          session.users &&
          session.users.map((user) => {
            return <p>{user.name}</p>
          })}

        <h1>How are you doing?</h1>
        <p>Pick a GIF to describe your experiences. </p>
        <Input className={styles.input} placeholder={'Happy, stressful, confusing'}></Input>
      </div>
      {session ? (
        <TrendingGifs className={styles.trendingGifs}></TrendingGifs>
      ) : (
        <>
          <p>Connecting to websocket...</p>
        </>
      )}
    </div>
  )
}

export default RoomPage
