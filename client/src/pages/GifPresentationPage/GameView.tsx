import { useCallback, useEffect, useRef, useState } from 'react'
import { GifResult, User } from '../../types/types'
import styles from './GameView.module.scss'
import UserControls from './UserControls'

interface GameViewProps {
  activeGif?: GifResult
  currentUser: User
  isCreator: boolean
}

function GameView({ activeGif, currentUser, isCreator }: GameViewProps) {
  const [height, setHeight] = useState<number | null>(null)
  const [width, setWidth] = useState(null)

  const imgWrapper = useCallback((node: any) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
      setWidth(node.getBoundingClientRect().width)
    }
  }, [])

  let elementDisplayed

  if (activeGif) {
    elementDisplayed = (
      <div className={styles.gifWrapper} ref={imgWrapper}>
        <img height={'430px'} width={'800px'} src={activeGif?.images.original.url} className={styles.gif} />
      </div>
    )
  }

  if (!activeGif) {
    elementDisplayed = <p>{currentUser.name ? currentUser.name : 'This user'} has not chosen a gif yet!</p>
  }

  return (
    <>
      <div className={styles.gifContainer}>{elementDisplayed}</div>
      <UserControls />
    </>
  )
}

export default GameView
