import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext, { AppProviders } from '../../shared/AppContext'
import { TrendingGifs } from '../../components/TrendingGifs'
import styles from './RoomPage.module.scss'
import Input from '../../components/Input'
import { NameForm } from '../../components/NameForm'

function RoomPage() {
  const { session, joinSession, needName }: AppProviders = useContext(AppContext)
  let { roomId } = useParams()

  useEffect(() => {
    !session && roomId && joinSession(roomId)
  }, [])

  if (needName) return <NameForm />

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
