import { useContext, useEffect, useState } from 'react'
import AppContext, { AppProviders } from '../../shared/AppContext'
import { Session } from '../../@types/types'
import { NameForm } from '../../components/NameForm'
import { Button } from '../../components/Button'

function HomePage() {
  const [roomCode, setRoomCode] = useState('')
  const { user, webSocketState, joinSession, createSession, needName, setNeedName }: AppProviders =
    useContext(AppContext)

  if (needName) return <NameForm />

  return (
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
          joinSession(roomCode, true)
        }}
      >
        join
      </Button>
      <h2>Create a New Session:</h2>
      <Button
        onClick={() => {
          createSession()
        }}
      >
        create
      </Button>
      <h2>Change name</h2>
      <Button onClick={() => setNeedName(true)}>change name</Button>
    </div>
  )
}
export default HomePage
