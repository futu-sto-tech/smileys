import { useContext } from 'react'
import AppContext from '../../shared/AppContext'
import styles from './index.module.scss'
import { Session } from '../../types/types'
import { IAppProvider } from '../../types/AppContext'
import { useGifByIds } from '../../hooks/api/useGifByIds'
import ParticipantList from './ParticipantList'
import GameWindow from './GameWindow'

interface GifPresentationPageProps {
  session: Session
}

function GifPresentationPage({ session }: GifPresentationPageProps) {
  const { user, updateSessionPresenter, startGame }: IAppProvider = useContext(AppContext)
  const { presenterIndex, users, gameStarted } = session
  const { isError, data: userGifMap, error, isFetching } = useGifByIds(users)
  const isCreator = user.id === session.creator.id
  const currentUser = users.find((user) => user.id === users[presenterIndex].id)!

  const activeGif = userGifMap?.get(users[presenterIndex].gifId)
  const Loader = () => <p>Loading...</p>

  return (
    <div className={styles.container}>
      <ParticipantList
        users={users}
        gameStarted={gameStarted}
        presenterIndex={presenterIndex}
        updateSessionPresenter={updateSessionPresenter}
        isCreator={isCreator}
      />

      {isFetching && <Loader />}

      {!isFetching && (
        <GameWindow
          currentUser={currentUser}
          isCreator={isCreator}
          startGame={startGame}
          gameStarted={gameStarted}
          activeGif={activeGif}
        />
      )}
    </div>
  )
}

export default GifPresentationPage
