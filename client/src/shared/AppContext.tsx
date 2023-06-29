import { useState, useEffect, createContext } from 'react'
import { io } from 'socket.io-client'
import { Session, User } from '../types/types'
import { v4 as uuid } from 'uuid'
import { IAppProvider } from '../types/AppContext'
import { ServerError } from '../types/errors'
import { useNavigate } from 'react-router-dom'

const AppContext = createContext<any>(null)
const socket = io(import.meta.env.VITE_SERVER_ADDRESS)

export const AppProvider = ({ children }: { children: JSX.Element | React.ReactElement[] }) => {
  const [user, setUser] = useState<User>(obtainUser())
  const [error, setError] = useState<ServerError>()
  const [gifSearchTerm, setGifSearchTerm] = useState<string>('')
  const [webSocketState, setWebSocketState] = useState<string>('Loading Websocket...')
  const [session, setSession] = useState<Session>()
  const [gameEnded, setGameEnded] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected')
      setWebSocketState('Connected to Websocket')
    })
    socket.on('message', (message) => {
      console.log('Websocket message: ', message)
    })
    socket.on('sessionUpdated', (session) => {
      setSession(session)
    })
    socket.on('sessionDeleted', () => {
      setGameEnded(true)
      setSession(session)
    })
    socket.on('disconnect', () => {
      setWebSocketState('Disconnected from Websocket')
    })
    socket.on('gameStarted', (session) => {
      setSession(session)
    })
    socket.on('error', (error: ServerError) => {
      setError(error)
    })
    // return () => {
    //   socket.disconnect()
    // }
  }, [socket])

  function obtainUser(): User {
    const userJSON = localStorage.getItem('user')
    if (!userJSON) {
      const user = { name: '', id: uuid(), gifId: '', gifThumbnailUrl: '' }
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    return { ...JSON.parse(userJSON), gifId: '' }
  }

  function saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  function joinSession(roomCode: string, callback?: () => void) {
    socket.emit('joinSession', { code: roomCode, user }, (session: Session) => {
      setSession(session)
      const clientUser = session.users.find((sessionUser) => sessionUser.id === user.id)
      if (clientUser && clientUser.gifId) setUser({ ...user, gifId: clientUser.gifId })
      callback && callback()
    })
  }

  function createSession(callback?: (code: string) => void) {
    socket.emit('createSession', { user }, (session: Session) => {
      setSession(session)
      callback && callback(session.code)
    })
  }

  function createSessionWithCode(code: string) {
    socket.emit('createSessionWithCode', { user, code }, (session: Session) => {
      setSession(session)
    })
  }

  function updateSessionUser(updatedUser: User, promoteToCreator?: boolean, callback?: () => void) {
    saveUser(updatedUser)
    if (!session) return
    setUser(updatedUser)
    socket.emit(
      'updateSessionUser',
      { code: session.code, user: updatedUser, promoteToCreator },
      (session: Session) => {
        setSession(session)
        callback && callback()
      }
    )
  }

  function updateSessionPresenter(previous?: boolean) {
    if (!session) return
    socket.emit('updateSessionPresenter', { code: session.code, previous }, (session: Session) => {
      setSession(session)
    })
  }

  function startGame() {
    if (!session) return
    socket.emit('startGame', { code: session.code, userId: user.id }, (session: Session) => {
      setSession(session)
    })
  }

  function deleteSession() {
    setGameEnded(true)
    if (!session) return
    socket.emit('deleteSession', { code: session.code }, (session: Session | undefined) => {
      setSession(session)
    })
  }

  function handleChangedName() {
    saveUser(user)
  }

  const providers: IAppProvider = {
    user,
    setUser,
    handleChangedName,
    socket,
    session,
    setSession,
    sessionEnded: gameEnded,
    setSessionEnded: setGameEnded,
    webSocketState,
    joinSession,
    createSession,
    createSessionWithCode,
    updateSessionUser,
    updateSessionPresenter,
    gifSearchTerm,
    setGifSearchTerm,
    startGame,
    deleteSession,
    error,
  }

  return <AppContext.Provider value={providers}>{children}</AppContext.Provider>
}

export default AppContext
