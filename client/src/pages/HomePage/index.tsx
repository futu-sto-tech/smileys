import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Session } from '../../@types/types'
import { NameForm } from '../../components/NameForm'
import { Button } from '../../components/Button'

function HomePage() {
  const [roomCode, setRoomCode] = useState('')
  const { user, webSocketState, joinSession, createSession, needName, setNeedName } = useContext(AppContext)

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
              joinSession(roomCode)
            }}
            text={'join'}
          />
          <h2>Create a New Session:</h2>
          <Button
            onClick={() => {
              createSession()
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
