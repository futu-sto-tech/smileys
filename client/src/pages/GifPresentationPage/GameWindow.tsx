import PreGameView from './PreGameView'
import styles from './GameWindow.module.scss'
import GameView from './GameView'
import { GifResult, User } from '../../types/types'

interface GameWindowProps {
  activeGif?: GifResult
  gameStarted: boolean
  startGame: () => void
  isCreator: boolean
  currentUser: User
}

function GameWindow({ activeGif, gameStarted, startGame, isCreator, currentUser }: GameWindowProps) {
  return (
    <div className={styles.gameWindowContainer}>
      {gameStarted ? (
        <GameView isCreator={isCreator} currentUser={currentUser} activeGif={activeGif} />
      ) : (
        <PreGameView isCreator={isCreator} startGame={startGame} />
      )}
    </div>
  )
}

export default GameWindow
