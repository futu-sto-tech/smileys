import PreGameView from './PreGameView'
import styles from './GameWindow.module.scss'
import GameView from './GameView'
import { GifResult, User, UserGifsByIdMap } from '../../types/types'

interface GameWindowProps {
  gameStarted: boolean
  startGame: () => void
  isCreator: boolean
  currentUser: User
  userGifsByIdMap?: UserGifsByIdMap
  activeGif?: GifResult
  code: string
}

function GameWindow({
  gameStarted,
  startGame,
  isCreator,
  currentUser,
  userGifsByIdMap,
  activeGif,
  code,
}: GameWindowProps) {
  return (
    <div className={styles.gameWindowContainer}>
      {gameStarted ? (
        <GameView
          activeGif={activeGif}
          isCreator={isCreator}
          currentUser={currentUser}
          userGifsByIdMap={userGifsByIdMap}
        />
      ) : (
        <PreGameView code={code} isCreator={isCreator} startGame={startGame} />
      )}
    </div>
  )
}

export default GameWindow
