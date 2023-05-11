import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import styles from './sessionMenu.module.scss'
import { Button, ButtonColor } from '../../components/Button'
import GifFetcher from '../../components/GifFetcher'
import { Session, User } from '../../types/types'
import { IAppProvider } from '../../types/AppContext'
import { useParams } from 'react-router-dom'
import { useGifByIds } from '../../hooks/api/useGifByIds'

function GifPresentationPage() {
  const { user, session, updateSessionPresenter, joinSession }: IAppProvider = useContext(AppContext)
  let { roomId } = useParams()

  useEffect(() => {
    !session && roomId && joinSession(roomId)
  }, [])

  function getGifIds(session?: Session) {
    if (!session) return []
    return session.users.map((user) => user.gifId)
  }

  const { status, data, error, isFetching } = useGifByIds(getGifIds(session))

  function handleNext() {
    if (session && session.presenterIndex < session?.users.length - 1) {
      updateSessionPresenter(session.presenterIndex + 1)
    }
  }

  function handleBack() {
    if (session && session.presenterIndex > 0) {
      updateSessionPresenter(session.presenterIndex - 1)
    }
  }

  function isCurrentUser(user: User) {
    return user.name === session?.users[session.presenterIndex].name
  }

  if (!session) return <></>

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <div>
          <h1>Participants</h1>
          {session?.users.map((user, i) => {
            return (
              <div className={`${styles.nameContainer} ${isCurrentUser(user) ? styles.highlightUser : ''}`} key={i}>
                <div style={{ backgroundColor: user.gifId ? '#38B271' : '#E8D213' }} className={styles.statusDot}></div>
                <p className={styles.name}>{user.name}</p>
              </div>
            )
          })}
        </div>
        <div className={styles.navigationButtonsContainer}>
          <Button buttonColor={session.presenterIndex <= 0 ? ButtonColor.Gray : ButtonColor.White} onClick={handleBack}>
            <img
              src="../../../../assets/icons/arrowLeft.svg"
              alt="back"
              style={session.presenterIndex <= 0 ? {} : { filter: 'brightness(0)' }}
            />{' '}
            Back
          </Button>
          <Button
            buttonColor={session.presenterIndex >= session.users.length - 1 ? ButtonColor.Gray : ButtonColor.White}
            onClick={handleNext}
          >
            Next{' '}
            <img
              src="../../../../assets/icons/arrowRight.svg"
              alt="next"
              style={session.presenterIndex >= session.users.length - 1 ? {} : { filter: 'brightness(0)' }}
            />
          </Button>
        </div>
      </div>
      {data && <img src={data[session.presenterIndex].images.fixed_height.url} className={styles.gif} />}
    </div>
  )
}

export default GifPresentationPage
