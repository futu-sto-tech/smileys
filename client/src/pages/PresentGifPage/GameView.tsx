import { GifResult, User, UserGifsByIdMap } from '../../types/types'
import styles from './GameView.module.scss'
import UserControls from './UserControls'
import GifImages from './GifImages'

interface GameViewProps {
  currentUser: User
  isCreator: boolean
  userGifsByIdMap?: UserGifsByIdMap
  activeGif?: GifResult
}

function GameView({ isCreator, userGifsByIdMap, activeGif }: GameViewProps) {
  return (
    <>
      <GifImages activeGif={activeGif} userGifsByIdMap={userGifsByIdMap} />
      <div className={styles.userControlsWrapper}>
        <UserControls isCreator={isCreator} />
      </div>
    </>
  )
}

export default GameView
