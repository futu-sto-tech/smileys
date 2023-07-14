import { useContext, useEffect } from 'react'
import { IAppProvider } from '../types/AppContext'
import AppContext from '../shared/AppContext'
import { Session, User } from '../types/types'
import { useNavigate, useParams } from 'react-router-dom'
import * as serverService from '../services/server'
import NotFoundPage from '../pages/NotFoundPage'
import DotDotDotAnimation from '../pages/PresentGifPage/DotDotDotAnimation'

interface ComponentWithSessionProps {
  session: Session
}

interface RedirectManagerProps<T extends ComponentWithSessionProps> {
  Component: React.ComponentType<T>
  page: string
}

const RedirectManager = ({ Component, page }: RedirectManagerProps<ComponentWithSessionProps>) => {
  const { webSocketState, session, joinSession, createSessionWithCode, user, sessionEnded }: IAppProvider =
    useContext(AppContext)
  const { roomId, gifId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session && !sessionEnded) handleJoinSession()
    redirect(webSocketState, session, roomId, user)
  }, [webSocketState, session])

  function handleJoinSession() {
    if (
      (page === 'BrowseGifPage' || page === 'SelectGifPage' || page === 'PresentGifPage') &&
      roomIdRequirements(roomId)
    ) {
      joinOrCreateSession()
    }
  }

  function redirect(webSocketState: string, session: Session | undefined, roomId: string | undefined, user: User) {
    if (webSocketState === 'Connected to Websocket') {
      if (sessionEnded) navigate('/end')

      if (page !== 'HomePage' && page !== 'ShareRoomPage' && !user.name) {
        navigate(`/name/${roomId}`)
      }
      if (page === 'PresentGifPage' && session && !user.gifId && roomIdRequirements(roomId)) {
        navigate(`/browse/${roomId}`)
      }
    }
  }

  function roomIdRequirements(roomId: string | undefined) {
    if (!(page === 'SelectGifPage' || page === 'PresentGifPage' || page === 'BrowseGifPage')) return true
    return !!(roomId && roomId.length >= 4 && roomId.length <= 10 && latinCharacters(roomId))
  }

  function gifIdRequirements(gifId: string | undefined) {
    if (!(page === 'SelectGifPage')) return true
    return !!gifId
  }

  function latinCharacters(string: string) {
    const nonLatinCapitalPattern = /[^A-Z]/
    return !nonLatinCapitalPattern.test(string)
  }

  async function sessionExists(roomId: string) {
    const { data } = await serverService.checkIfSessionExists(roomId)
    return !!data
  }

  async function joinOrCreateSession() {
    const exists = await sessionExists(roomId!)
    exists ? joinSession(roomId!) : createSessionWithCode(roomId!)
  }

  if (!roomIdRequirements(roomId) || !gifIdRequirements(gifId)) return <NotFoundPage />
  else if (!session) return <DotDotDotAnimation />

  return <Component session={session}></Component>
}

export default RedirectManager
