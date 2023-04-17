import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Session } from '../../@types/types'
import { NameForm } from '../../components/NameForm'
import { Button } from '../../components/Button'

interface User {
  name: string
  id: string
}

function HomePage() {
  const [roomCode, setRoomCode] = useState('')
  const { user, socket, webSocketState, setSession, needName, setNeedName } = useContext(AppContext)

  return (
    <>
      {needName ? (
        <NameForm />
      ) : (
        <div>
          <p>{webSocketState}</p>
          <h1>Welcome to Smileys {user.name} :)</h1>
          <h2> Join Session with code:</h2>
          <input
            placeholder="Code"
            value={roomCode}
            onChange={(e) => {
              setRoomCode(e.target.value)
            }}
          ></input>
          <Button
            onClick={() => {
              socket.emit('joinSession', { code: roomCode, user }, (session: Session) => {
                setSession(session)
                setNeedName(!user.name)
              })
            }}
            text={'join'}
          />
          <h2>Create a New Session:</h2>
          <Button
            onClick={() => {
              socket.emit('createSession', { user }, (session: Session) => {
                setSession(session)
                setNeedName(!user.name)
              })
            }}
            text={'create'}
          />
          <h2>Change name</h2>
          <Button onClick={() => setNeedName(true)} text={'Change Name'} />
        </div>
      )}
    </>
  )
}
export default HomePage
