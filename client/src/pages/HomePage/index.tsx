import { useContext, useEffect, useState } from 'react'
import WebSocketContext from '../../shared/WebSocketContext'
import { Session } from '../../@types/types'

function HomePage() {
  const [name, setName] = useState('')
  const [roomCode, setRoomCode] = useState('')

  const { socket, webSocketState, setSession } = useContext(WebSocketContext)
  return (
    <div>
      <p>{webSocketState}</p>
      <h1>Welcome to Smileys :)</h1>
      <h2>What's your name?</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      ></input>
      <h2> Join Session with code:</h2>
      <input
        placeholder="Code"
        value={roomCode}
        onChange={(e) => {
          setRoomCode(e.target.value)
        }}
      ></input>
      <button
        onClick={(e) => {
          socket.emit('joinSession', { code: roomCode, name }, (session: Session) => {
            setSession(session)
          })
        }}
      >
        join
      </button>
      <h2>Create a New Session:</h2>

      <button
        onClick={(e) => {
          socket.emit('createSession', { name }, (session: Session) => {
            setSession(session)
          })
        }}
      >
        create
      </button>
    </div>
  )
}

export default HomePage
