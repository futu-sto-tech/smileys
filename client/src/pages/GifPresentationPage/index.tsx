import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import styles from './GifPresentationPage.module.scss'
import { Button, ButtonColor } from '../../components/Button'
import { Session, User } from '../../types/types'
import { IAppProvider } from '../../types/AppContext'
import { useParams } from 'react-router-dom'
import { useGifByIds } from '../../hooks/api/useGifByIds'

interface GifPresentationPageProps {
  session: Session
}

function GifPresentationPage({ session }: GifPresentationPageProps) {
  const { user, updateSessionPresenter, joinSession }: IAppProvider = useContext(AppContext)
  const { presenterIndex, users } = session
  const { isError, data: userGifMap, error, isFetching } = useGifByIds(users)

  function isCurrentUser(user: User) {
    return user.id === users[presenterIndex].id
  }

  const isFirstPresenter = presenterIndex <= 0
  const isLastPresenter = presenterIndex >= users.length - 1

  function handleNext() {
    if (session && !isLastPresenter) updateSessionPresenter(presenterIndex + 1)
  }

  function handleBack() {
    if (session && !isFirstPresenter) updateSessionPresenter(presenterIndex - 1)
  }

  const activeGif = userGifMap?.get(users[presenterIndex].gifId)
  const loader = () => <p>Loading...</p>

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
          <Button buttonColor={isFirstPresenter ? ButtonColor.Gray : ButtonColor.White} onClick={handleBack}>
            <img
              src="../../../../assets/icons/arrowLeft.svg"
              alt="back"
              style={isFirstPresenter ? {} : { filter: 'brightness(0)' }}
            />{' '}
            Back
          </Button>
          <Button buttonColor={isLastPresenter ? ButtonColor.Gray : ButtonColor.White} onClick={handleNext}>
            Next{' '}
            <img
              src="../../../../assets/icons/arrowRight.svg"
              alt="next"
              style={isLastPresenter ? {} : { filter: 'brightness(0)' }}
            />
          </Button>
        </div>
      </div>

      {isFetching && loader()}

      <div className={styles.gifContainer}>
        {!isFetching &&
          activeGif &&
          (activeGif.images.original.width / activeGif.images.original.height < 2 ? (
            <img src={activeGif.images.original.url} height={600} className={styles.gif} />
          ) : (
            <img src={activeGif.images.original.url} width={1200} className={styles.gif} />
          ))}
      </div>
    </div>
  )
}

export default GifPresentationPage
