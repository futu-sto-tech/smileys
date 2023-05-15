import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { GifList } from '../../components/GifList'
import styles from './RoomPage.module.scss'
import Input from '../../components/Input'
import SessionMenu from '../GifPresentationPage'
import { IAppProvider } from '../../types/AppContext'
import { Session } from '../../types/types'

interface RoomPageProps {
  session: Session
}

function RoomPage({ session }: RoomPageProps) {
  const { joinSession, user, setGifSearchTerm, gifSearchTerm }: IAppProvider = useContext(AppContext)
  let { roomId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.name) {
      navigate(`/name/${roomId}`)
    }
    roomId && joinSession(roomId)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGifSearchTerm(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>How are you doing?</h1>
        <p>Pick a GIF to describe your experiences. </p>
        <Input onChange={handleSearch} className={styles.input} placeholder={'Happy, stressful, confusing'}></Input>
      </div>
      {session ? (
        <GifList className={styles.gifList} session={session}></GifList>
      ) : (
        <>
          <p>Connecting to websocket...</p>
        </>
      )}
    </div>
  )
}

export default RoomPage
