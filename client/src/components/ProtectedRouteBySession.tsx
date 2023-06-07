import { useContext, useEffect } from 'react'
import { IAppProvider } from '../types/AppContext'
import AppContext from '../shared/AppContext'
import { Session } from '../types/types'
import { useParams } from 'react-router-dom'
import * as serverService from '../services/server'

interface ComponentWithSessionProps {
  session: Session
}

interface SuspendSessionRouteProps<T extends ComponentWithSessionProps> {
  Component: React.ComponentType<T>
  isRoomPage?: boolean
}

const SuspendSessionRoute = ({ Component, isRoomPage }: SuspendSessionRouteProps<ComponentWithSessionProps>) => {
  const { session, joinSession, createSession }: IAppProvider = useContext(AppContext)
  const { roomId } = useParams()

  useEffect(() => {
    if (isRoomPage) joinOrCreateSession()
    else if (roomId) joinSession(roomId)
  }, [session])

  async function joinOrCreateSession() {
    if (!session && roomId) {
      console.log('waiting...')
      const { err } = await serverService.checkIfSessionExists(roomId)
      console.log({ err })
      err ? createSession() : joinSession(roomId)
    }
  }

  if (!session) return <p>Loading...</p>

  return <Component session={session}></Component>
}

export default SuspendSessionRoute
