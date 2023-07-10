import styles from './index.module.scss'
import CopyButton from '../CopyButton'

interface ShareSessionProps {
  big?: boolean
  onCopied: () => void
  roomId: string
}

function ShareRoom({ big, onCopied, roomId }: ShareSessionProps) {
  return (
    <div className={`${styles.container} ${big ? styles.big : styles.small}`}>
      <p className="font-bold">
        <span className="mr-[5px]">{`${window.location.hostname}/${roomId}`}</span>
        <CopyButton text={`${window.location.hostname}/${roomId}`} />
      </p>
    </div>
  )
}

export default ShareRoom
