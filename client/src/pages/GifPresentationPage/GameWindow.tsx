import PreGameView from './PreGameView'
import styles from './GameWindow.module.scss'
import Gif from './PresenterGif'
import { User } from '../../types/types'

interface GameWindowProps {
  activeGif: any
  gameStarted: boolean
  startGame: () => void
  isCreator: boolean
  currentUser: User
}

function GameWindow({ activeGif, gameStarted, startGame, isCreator, currentUser }: GameWindowProps) {
  return (
    <div className={styles.gameWindowContainer}>
      {gameStarted ? (
        <Gif currentUser={currentUser} activeGif={activeGif} />
      ) : (
        <PreGameView isCreator={isCreator} startGame={startGame} />
      )}
    </div>
  )
}

export default GameWindow
