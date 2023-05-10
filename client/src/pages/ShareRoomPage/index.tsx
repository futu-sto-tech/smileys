import { useContext, useState } from 'react'
import ShareRoom from '../../components/ShareRoom'
import styles from './ShareRoomPage.module.scss'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import AppContext, { AppProviders } from '../../shared/AppContext'

function ShareRoomPage() {
  const [showJoinRoom, setShowJoinRoom] = useState(false)
  const { session }: AppProviders = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h1>Your team's session code</h1>
      <ShareRoom onCopied={() => setShowJoinRoom(true)} />
      {showJoinRoom && (
        <Button
          onClick={() => {
            if (session) navigate(`/${session.code}`)
          }}
        >
          Join room!
        </Button>
      )}
      <div className={styles.joinRoom}>
        <p>
          Already have an existing room?<span className={styles.joinNow}></span>
        </p>
      </div>
    </div>
  )
}

export default ShareRoomPage
