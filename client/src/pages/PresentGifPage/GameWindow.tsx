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
}

function GameWindow({ gameStarted, startGame, isCreator, currentUser, userGifsByIdMap, activeGif }: GameWindowProps) {
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
        <PreGameView isCreator={isCreator} startGame={startGame} />
      )}
    </div>
  )
}

export default GameWindow
