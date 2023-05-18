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
  const gif = (
    <div className={styles.gifContainer}>
      <div className={styles.gifWrapper}>
        <img height={'430px'} width={'800px'} src={activeGif?.images.original.url} className={styles.gif} />
      </div>
    </div>
  )

  const gifNotChosen = (
    <div className={styles.hasNotChosen}>
      <p>{currentUser.name ? currentUser.name : 'This user'} has not chosen a GIF yet! 🥲</p>
    </div>
  )

  return (
    <>
      {activeGif ? gif : gifNotChosen}
      <UserControls isCreator={isCreator} />
    </>
  )
}

export default GameView
