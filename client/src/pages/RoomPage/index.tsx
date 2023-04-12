import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import WebSocketContext from '../../shared/WebSocketContext'

function RoomPage() {
  const { session } = useContext(WebSocketContext)
  let { id } = useParams()
  return (
    <div>
      <p>This this is room {id}</p>
      {session && (
        <>
          <h1>Session:</h1>
          <p>Code: {session.code}</p>
          <p>Creator: {session.creator.name}</p>
          <p>
            Participants:{' '}
            {session.users.map((user: { name: string }) => {
              return user.name + ', '
            })}
          </p>
        </>
      )}
    </div>
  )
}

export default RoomPage