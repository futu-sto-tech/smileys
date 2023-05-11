import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Session } from '../../types/types'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import { IAppProvider } from '../../types/AppContext'
import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.scss'

function HomePage() {
  const [roomId, setRoomId] = useState('')
  const { user, webSocketState, joinSession, createSession }: IAppProvider = useContext(AppContext)
  const navigate = useNavigate()

  function handleJoin() {
    if (user.name) {
      joinSession(roomId, () => {
        navigate(`/${roomId}`)
      })
    } else {
      navigate(`/name/${roomId}`)
    }
  }

  function handleCreate() {
    createSession((newRoomId) => {
      navigate(`/create/${newRoomId}`)
    })
  }

  return (
    <div className={styles.container}>
      <h1>Welcome to Smileys {user.name} :)</h1>
      <div>
        <Button onClick={handleCreate}>Create a New Session</Button>
      </div>
      <div>
        <h2> Join Session with code:</h2>
        <Input
          placeholder="Code"
          onChange={(e) => {
            setRoomId(e.target.value)
          }}
        ></Input>
        <Button onClick={handleJoin}>Join</Button>
      </div>
    </div>
  )
}
export default HomePage
