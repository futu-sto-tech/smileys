import { useContext, useEffect } from 'react'
import { IAppProvider } from '../types/AppContext'
import AppContext from '../shared/AppContext'
import { Session } from '../types/types'
import { useNavigate, useParams } from 'react-router-dom'
import * as serverService from '../services/server'

interface ComponentWithSessionProps {
  session: Session
}

interface SuspendSessionRouteProps<T extends ComponentWithSessionProps> {
  Component: React.ComponentType<T>
  isRoomPage?: boolean
}

const SuspendSessionRoute = ({ Component, isRoomPage }: SuspendSessionRouteProps<ComponentWithSessionProps>) => {
  const { webSocketState, session, joinSession, createSessionWithCode }: IAppProvider = useContext(AppContext)
  const { roomId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (webSocketState === 'Connected to Websocket' && !session) {
      if (isRoomPage) joinOrCreateSession()
      else if (roomId) handleJoinSession(roomId)
    }
  }, [webSocketState, session])

  async function sessionExists(roomId: string) {
    const { err } = await serverService.checkIfSessionExists(roomId)
    return !err
  }

  async function joinOrCreateSession() {
    if (!session && roomId) {
      const exists = await sessionExists(roomId)
      exists ? joinSession(roomId) : createSessionWithCode(roomId)
    }
  }

  async function handleJoinSession(roomId: string) {
    const exists = await sessionExists(roomId)
    exists ? joinSession(roomId) : navigate('/')
  }

  if (!session) return <p>Loading...</p>

  return <Component session={session}></Component>
}

export default SuspendSessionRoute
