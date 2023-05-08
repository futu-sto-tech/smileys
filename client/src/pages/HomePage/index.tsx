import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Session } from '../../types/types'
import { NameForm } from '../../components/NameForm'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import { IAppProvider } from '../../types/AppContext'

function HomePage() {
  const [roomCode, setRoomCode] = useState('')
  const { user, webSocketState, joinSession, createSession, needName, setNeedName }: IAppProvider =
    useContext(AppContext)

  if (needName) return <NameForm />

  return (
    <div>
      <p>{webSocketState}</p>
      <h1>Welcome to Smileys {user.name} :)</h1>
      <h2> Join Session with code:</h2>
      <Input
        placeholder="Code"
        value={roomCode}
        onChange={(e) => {
          setRoomCode(e.target.value)
        }}
      ></Input>
      <Button
        onClick={() => {
          joinSession(roomCode, true)
        }}
      >
        Join
      </Button>
      <h2>Create a New Session:</h2>
      <Button
        onClick={() => {
          createSession()
        }}
      >
        Create
      </Button>
      <h2>Change name</h2>
      <Button onClick={() => setNeedName(true)}>Change name</Button>
    </div>
  )
}
export default HomePage
