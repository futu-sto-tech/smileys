import { Button } from '../../components/Button'
import styles from './PreGameView.module.scss'

interface PreGameViewProps {
  startGame: () => void
  isCreator: boolean
}

function PreGameView({ startGame, isCreator }: PreGameViewProps) {
  return (
    <div className={styles.preGameContainer}>
      {isCreator ? (
        <Button onClick={startGame} size="large">
          Start
        </Button>
      ) : (
        <p>Waiting for host to start the game!</p>
      )}
    </div>
  )
}

export default PreGameView
