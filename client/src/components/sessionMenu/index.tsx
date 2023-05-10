import { useContext, useState } from 'react'
import AppContext from '../../shared/AppContext'
import styles from './sessionMenu.module.scss'
import { Button, ButtonColor } from '../Button'
import GifFetcher from '../GifFetcher'
import { User } from '../../types/types'
import { IAppProvider } from '../../types/AppContext'

function SessionMenu() {
  const { user, session, updateSessionPresenter }: IAppProvider = useContext(AppContext)

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
          {session?.users.map((user) => {
            return (
              <div className={`${styles.nameContainer} ${isCurrentUser(user) ? styles.highlightUser : ''}`}>
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
      <GifFetcher gifId={session.users[session.presenterIndex].gifId} />
    </div>
  )
}

export default SessionMenu
