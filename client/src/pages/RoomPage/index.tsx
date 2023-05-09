import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { GifList } from '../../components/GifList'
import styles from './RoomPage.module.scss'
import Input from '../../components/Input'
import { NameForm } from '../../components/NameForm'
import GifFetcher from '../../components/GifFetcher'
import SessionMenu from '../../components/sessionMenu'
import { IAppProvider } from '../../types/AppContext'

function RoomPage() {
  const { session, joinSession, needName, user, setGifSearchTerm, gifSearchTerm }: IAppProvider = useContext(AppContext)
  let { roomId } = useParams()

  useEffect(() => {
    !session && roomId && joinSession(roomId)
  }, [])

  if (needName) return <NameForm />

  // Temporary for demonstrating GIFS
  if (user.gifId && session) {
    return (
      <>
        {/* {session.users.map((user, i) => {
          if (user.gifId) {
            return (
              <>
                <p>name: {user.name}</p>
                <GifFetcher key={i} gifId={user.gifId} />
              </>
            )
          }
          return <p>{user.name} is still choosing</p>
        })} */}
        <SessionMenu></SessionMenu>
      </>
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGifSearchTerm(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {session &&
          session.users &&
          session.users.map((user, i) => {
            return <p key={i}>{user.name}</p>
          })}

        <h1>How are you doing?</h1>
        <p>Pick a GIF to describe your experiences. </p>
        <Input onChange={handleSearch} className={styles.input} placeholder={'Happy, stressful, confusing'}></Input>
      </div>
      {session ? (
        <GifList className={styles.gifList}></GifList>
      ) : (
        <>
          <p>Connecting to websocket...</p>
        </>
      )}
    </div>
  )
}

export default RoomPage
