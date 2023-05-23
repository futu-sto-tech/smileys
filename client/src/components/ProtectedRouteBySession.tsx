import { useContext, useEffect } from 'react'
import { IAppProvider } from '../types/AppContext'
import AppContext from '../shared/AppContext'
import { Session } from '../types/types'
import { useMatch, useNavigate, useParams } from 'react-router-dom'

interface ComponentWithSessionProps {
  session: Session
}

interface SuspendSessionRouteProps<T extends ComponentWithSessionProps> {
  Component: React.ComponentType<T>
}

const SuspendSessionRoute = ({ Component }: SuspendSessionRouteProps<ComponentWithSessionProps>) => {
  const { session, joinSession }: IAppProvider = useContext(AppContext)
  const { roomId } = useParams()

  useEffect(() => {
    !session && roomId && joinSession(roomId)
  }, [session])

  if (!session) return <p>Loading...</p>

  return <Component session={session}></Component>
}

export default SuspendSessionRoute
