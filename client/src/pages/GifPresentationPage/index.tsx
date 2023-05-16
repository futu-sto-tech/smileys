import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import styles from './GifPresentationPage.module.scss'
import { Button, ButtonColor } from '../../components/Button'
import { Session, User } from '../../types/types'
import { IAppProvider } from '../../types/AppContext'
import { useParams } from 'react-router-dom'
import { useGifByIds } from '../../hooks/api/useGifByIds'
import ParticipantList from './ParticipantList'

interface GifPresentationPageProps {
  session: Session
}

function GifPresentationPage({ session }: GifPresentationPageProps) {
  const { user, updateSessionPresenter, joinSession }: IAppProvider = useContext(AppContext)
  const { presenterIndex, users } = session
  const { isError, data: userGifMap, error, isFetching } = useGifByIds(users)

  const activeGif = userGifMap?.get(users[presenterIndex].gifId)
  const loader = () => <p>Loading...</p>

  return (
    <div className={styles.container}>
      <ParticipantList users={users} presenterIndex={presenterIndex} updateSessionPresenter={updateSessionPresenter} />

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
