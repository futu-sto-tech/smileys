import { useContext, useState } from 'react'
import ShareRoom from '../../components/ShareRoom'
import styles from './ShareRoomPage.module.scss'
import { Button } from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'

function ShareRoomPage() {
  const [showJoinRoom, setShowJoinRoom] = useState(false)
  const { user, joinSession }: IAppProvider = useContext(AppContext)
  let { roomId } = useParams()
  const navigate = useNavigate()

  function handleJoin() {
    if (user.name) {
      if (roomId) {
        joinSession(roomId, () => {
          navigate(`/${roomId}`)
        })
      } else {
        navigate(`/${roomId}`)
      }
    } else {
      navigate(`/name/${roomId}`)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Your team's session code</h1>
      <ShareRoom onCopied={() => setShowJoinRoom(true)} />
      {showJoinRoom && <Button onClick={handleJoin}>Join room!</Button>}
      <div className={styles.joinRoom}>
        <p>
          Already have an existing room?<span className={styles.joinNow}></span>
        </p>
      </div>
    </div>
  )
}

export default ShareRoomPage
