import { useContext, useState } from 'react'
import ShareRoom from '../../components/ShareRoom'
import styles from './ShareRoomPage.module.scss'
import { Button } from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'

function ShareRoomPage() {
  const [showJoinRoom, setShowJoinRoom] = useState(false)
  const { user }: IAppProvider = useContext(AppContext)
  let { roomId } = useParams()
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your team's session code</h1>
      <ShareRoom onCopied={() => setShowJoinRoom(true)} big={true} />
      {showJoinRoom && (
        <Button
          className={styles.button}
          onClick={() => {
            if (user.name) {
              navigate(`/${roomId}`)
            } else {
              navigate(`/name/${roomId}`)
            }
          }}
        >
          Join room!
        </Button>
      )}
      <div className={styles.joinRoom}></div>
    </div>
  )
}

export default ShareRoomPage
