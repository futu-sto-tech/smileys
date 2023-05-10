import { useContext, useEffect, useState } from 'react'

import AppContext from '../../shared/AppContext'
import { Session } from '../../types/types'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import { IAppProvider } from '../../types/AppContext'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const [roomCode, setRoomCode] = useState('')
  const { user, webSocketState, joinSession, createSession }: IAppProvider = useContext(AppContext)
  const navigate = useNavigate()

  function handleJoin() {
    if (user.name) {
      joinSession(roomCode, () => {
        navigate(`/${roomCode}`)
      })
    } else {
      navigate(`/name/${roomCode}`)
    }
  }

  function handleCreate() {
    if (user.name) {
      createSession((code) => {
        navigate(`/create/${code}`)
      })
    } else {
      navigate(`/${roomCode}/name`)
    }
  }

  return (
    <div>
      <p>{webSocketState}</p>
      <h1>Welcome to Smileys {user.name} :)</h1>
      <h2> Join Session with code:</h2>
      <Input
        placeholder="Code"
        onChange={(e) => {
          setRoomCode(e.target.value)
        }}
      ></Input>
      <Button onClick={handleJoin}>Join</Button>
      <h2>Create a New Session:</h2>
      <Button onClick={handleCreate}>Create</Button>
    </div>
  )
}
export default HomePage
