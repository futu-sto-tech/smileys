import { useContext, useState } from 'react'
import styles from './ShareRoom.module.scss'
import AppContext from '../../shared/AppContext'
import { Button } from '../Button'
import { IAppProvider } from '../../types/AppContext'

interface ShareSessionProps {
  big?: boolean
  onCopied: () => void
}

function ShareRoom({ big, onCopied }: ShareSessionProps) {
  const { session }: IAppProvider = useContext(AppContext)
  const [hasCopied, setHasCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(`${window.location.hostname}/${session?.code}`)
    setHasCopied(true)
    onCopied()
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
        <Button buttonColor="black" onClick={handleClick}>
          Copy link
        </Button>
      )}
    </div>
  )
}

export default ShareRoom
