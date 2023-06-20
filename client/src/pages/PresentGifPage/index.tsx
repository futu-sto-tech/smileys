import { useContext } from 'react'
import AppContext from '../../shared/AppContext'
import styles from './index.module.scss'
import { Session } from '../../types/types'
import { IAppProvider } from '../../types/AppContext'
import ParticipantList from './ParticipantList'
import GameWindow from './GameWindow'
import { useGetGifs } from '../../hooks/api/useGetGifs'

interface GifPresentationPageProps {
  session: Session
}

function PresentGifPage({ session }: GifPresentationPageProps) {
  const { user, updateSessionPresenter, startGame, updateSessionUser }: IAppProvider = useContext(AppContext)

  const { presenterIndex, users, gameStarted } = session
  const { isError, data: userGifMap, error, isFetching } = useGetGifs(users)
  const isCreator = user.id === session.creator.id
  const currentUser = users.find((user) => user.id === users[presenterIndex].id)!

  const activeGif = userGifMap?.get(users[presenterIndex].gifId)
  const Loader = () => <p>Loading...</p>

  return (
    <div className={styles.container}>
      <ParticipantList
        clientUser={user}
        updateSessionUser={updateSessionUser}
        users={users}
        gameStarted={gameStarted}
        presenterIndex={presenterIndex}
        updateSessionPresenter={updateSessionPresenter}
        isCreator={isCreator}
        session={session}
      />

      {isFetching && <Loader />}

      {!isFetching && (
        <GameWindow
          currentUser={currentUser}
          isCreator={isCreator}
          startGame={startGame}
          gameStarted={gameStarted}
          activeGif={activeGif}
          userGifsByIdMap={userGifMap}
        />
      )}
    </div>
  )
}

export default PresentGifPage
