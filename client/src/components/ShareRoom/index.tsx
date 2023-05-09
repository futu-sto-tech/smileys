import { useContext, useState } from 'react'
import styles from './ShareRoom.module.scss'
import AppContext, { AppProviders } from '../../shared/AppContext'
import { Button, ButtonColor } from '../Button'

interface ShareSessionProps {
  big?: boolean
}

function ShareRoom({ big }: ShareSessionProps) {
  const { session }: AppProviders = useContext(AppContext)
  const [hasCopied, setHasCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(`${window.location.hostname}/${session?.code}`)
    setHasCopied(true)

    setTimeout(() => {
      setHasCopied(false)
    }, 4000)
  }

  return (
    <div className={`${styles.container} ${big ? styles.big : styles.small}`}>
      <p className={styles.url}>{`${window.location.hostname}/${session?.code}`}</p>
      {hasCopied ? (
        <p>Copied!</p>
      ) : (
        <Button buttonColor={ButtonColor.Black} onClick={handleClick}>
          Copy link
        </Button>
      )}
    </div>
  )
}

export default ShareRoom
