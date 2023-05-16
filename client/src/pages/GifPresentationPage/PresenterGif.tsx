import { User } from '../../types/types'
import styles from './PresenterGif.module.scss'

interface PresenterGifProps {
  activeGif: any
  currentUser: User
}

function PresenterGif({ activeGif, currentUser }: PresenterGifProps) {
  const Gif = () =>
    activeGif.images.original.width / activeGif.images.original.height < 2 ? (
      <img src={activeGif.images.original.url} height={600} className={styles.gif} />
    ) : (
      <img src={activeGif.images.original.url} width={1200} className={styles.gif} />
    )

  return (
    <>{activeGif ? <Gif /> : <p>{currentUser.name ? currentUser.name : 'This user'} has not chosen a gif yet!</p>}</>
  )
}

export default PresenterGif
