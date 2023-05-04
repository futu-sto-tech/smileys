import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext, { AppProviders } from '../../shared/AppContext'
import { TrendingGifs } from '../../components/TrendingGifs'
import styles from './RoomPage.module.scss'
import Input from '../../components/Input'
import { NameForm } from '../../components/NameForm'
import { useGifById } from '../../shared/gif_api'
import { Gif } from '../../components/Gif'

function RoomPage() {
  const { session, joinSession, needName, user }: AppProviders = useContext(AppContext)
  let { roomId } = useParams()

  useEffect(() => {
    !session && roomId && joinSession(roomId)
  }, [])

  if (needName) return <NameForm />

  // Temporary for demonstating GIFS

  if (user.gifId) {
    const temp = session?.users.map((user) => {
      if (user.gifId) {
        const { status, data, error, isFetching } = useGifById(user.gifId)
        return { ...user, status, ...data }
      }
      return user
    })
    if (temp) {
      return (
        <>
          {temp.map((user: any, i) => {
            if (user.gifId) {
              return (
                <>
                  <p>name: {user.name}</p>
                  {user.images && <Gif url={user.images.original.url} key={i}></Gif>}
                </>
              )
            }
            return <p>{user.name} is still choosing</p>
          })}
        </>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {/* <TrendingGifs /> */}
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
