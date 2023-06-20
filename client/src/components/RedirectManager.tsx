import { useContext, useEffect } from 'react'
import { IAppProvider } from '../types/AppContext'
import AppContext from '../shared/AppContext'
import { Session, User } from '../types/types'
import { useNavigate, useParams } from 'react-router-dom'
import * as serverService from '../services/server'
import NotFoundPage from '../pages/NotFoundPage'
import Loader from './Loader'

interface ComponentWithSessionProps {
  session: Session
}

interface RedirectManagerProps<T extends ComponentWithSessionProps> {
  Component: React.ComponentType<T>
  page: string
}

const RedirectManager = ({ Component, page }: RedirectManagerProps<ComponentWithSessionProps>) => {
  const { webSocketState, session, joinSession, createSessionWithCode, user }: IAppProvider = useContext(AppContext)
  const { roomId, gifId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    redirect(webSocketState, session, roomId, user)
  }, [webSocketState, session])

  function redirect(webSocketState: string, session: Session | undefined, roomId: string | undefined, user: User) {
    if (webSocketState === 'Connected to Websocket' && !session) {
      if (page === 'BrowseGifPage' && roomIdRequirements(roomId)) joinOrCreateSession()
      //RoomId could be undefined if the user inputs url .../present/ etc.
      if (page === 'SelectGifPage' || page === 'PresentGifPage') {
        if (roomIdRequirements(roomId)) handleJoinSession(roomId!)
      }
      if (page !== 'HomePage' && page !== 'ShareRoomPage' && !user.name) {
        navigate(`/name/${roomId}`)
      } else if (page === 'PresentGifPage' && !user.gifId && roomIdRequirements(roomId)) navigate(`/browse/${roomId}`)
    }
  }

  function roomIdRequirements(roomId: string | undefined) {
    if (!(page === 'SelectGifPage' || page === 'PresentGifPage' || page === 'BrowseGifPage')) return true
    console.log({ roomId, length: roomId?.length, latin: latinCharacters(roomId!) })

    return !!(roomId && roomId.length >= 4 && roomId.length <= 10 && latinCharacters(roomId))
  }

  function gifIdRequirements(gifId: string | undefined) {
    if (!(page === 'SelectGifPage')) return true
    return !!(gifId && gifId.length === 18)
  }

  function latinCharacters(string: string) {
    const nonLatinCapitalPattern = /[^A-Z]/
    return !nonLatinCapitalPattern.test(string)
  }

  async function sessionExists(roomId: string) {
    const { err } = await serverService.checkIfSessionExists(roomId)
    return !err
  }

  async function joinOrCreateSession() {
    if (!session) {
      const exists = await sessionExists(roomId!)
      exists ? joinSession(roomId!) : createSessionWithCode(roomId!)
    }
  }

  async function handleJoinSession(roomId: string) {
    const exists = await sessionExists(roomId)
    exists ? joinSession(roomId) : navigate('/end')
  }

  if (!roomIdRequirements(roomId) || !gifIdRequirements(gifId)) return <NotFoundPage />
  else if (!session) return <Loader />

  return <Component session={session}></Component>
}

export default RedirectManager
