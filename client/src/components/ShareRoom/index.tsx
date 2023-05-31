import { useContext, useState } from 'react'
import styles from './index.module.scss'
import AppContext from '../../shared/AppContext'
import { Button } from '../Button'
import { IAppProvider } from '../../types/AppContext'

interface ShareSessionProps {
  big?: boolean
  onCopied: () => void
  roomId: string
}

function ShareRoom({ big, onCopied, roomId }: ShareSessionProps) {
  const [hasCopied, setHasCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(`${window.location.hostname}/${roomId}`)
    setHasCopied(true)
    onCopied()
    setTimeout(() => {
      setHasCopied(false)
    }, 4000)
  }

  return (
    <div className={`${styles.container} ${big ? styles.big : styles.small}`}>
      <p className={styles.url}>{`${window.location.hostname}/${roomId}`}</p>
      {hasCopied ? (
        <p>Copied!</p>
      ) : (
        <Button buttonColor="black" onClick={handleClick}>
          Copy link
        </Button>
      )}
    </div>
  )
}

export default ShareRoom
