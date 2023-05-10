import React, { useState, useEffect, useRef, createContext } from 'react'
import { Socket, io } from 'socket.io-client'
import { Session, User } from '../@types/types'
import { v4 as uuid } from 'uuid'

interface socketEvent {
  event: string
  params: {}
}

const AppContext = createContext<any>(null)
const socket = io(import.meta.env.VITE_SERVER_ADDRESS)

export const AppProvider = ({ children }: { children: JSX.Element | undefined }) => {
  const [user, setUser] = useState<User>(obtainUser())
  const userName = useRef<string>('')
  userName.current = user ? user.name : ''
  const [socketEventAfterName, setSocketEventAfterName] = useState<socketEvent>({ event: '', params: {} })
  const [webSocketState, setWebSocketState] = useState<string>('Loading Websocket...')
  const [session, setSession] = useState<Session>()
  const sessionRef = useRef<Session>()
  sessionRef.current = session

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
    // socket.on('gameStarted', () => {
    //   if (sessionRef.current) {
    //
    //   }
    // })
    socket.on('disconnect', () => {
      setWebSocketState('Disconnected from Websocket')
    })
    socket.on('error', () => {
      console.log('Error')
    })
    // return () => {
    //   socket.disconnect()
    // }
  }, [socket])

  function obtainUser(): User {
    const userJSON = localStorage.getItem('user')
    if (!userJSON) {
      return { name: '', id: uuid(), gifId: '' }
    }
    return JSON.parse(userJSON)
  }

  function saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  function joinSession(roomCode: string, navigationCallback?: () => void) {
    socket.emit('joinSession', { code: roomCode, user }, (session: Session) => {
      setSession(session)
      navigationCallback && navigationCallback()
    })
  }

  function createSession(navigationCallback: (code: string) => void) {
    socket.emit('createSession', { user }, (session: Session) => {
      setSession(session)
      navigationCallback(session.code)
    })
  }

  function updateSessionUser(updatedUser: User) {
    if (!session) {
      return // Todo
    }
    setUser(updatedUser)
    socket.emit('updateSessionUser', { code: session.code, user: updatedUser }, (session: Session) => {
      setSession(session)
    })
  }

  function updateSessionPresenter(presenterId: number) {
    if (!session) return
    socket.emit('updateSessionPresenter', { code: session.code, presenterId }, (session: Session) => {
      setSession(session)
    })
  }

  function handleChangedName() {
    saveUser(user)
    socket.emit(socketEventAfterName.event, { ...socketEventAfterName.params, user }, (session: Session) => {
      setSession(session)
    })
  }

  const providers: AppProviders = {
    user,
    setUser,
    handleChangedName,
    socket,
    session: sessionRef.current,
    setSession,
    webSocketState,
    joinSession,
    createSession,
    updateSessionUser,
    updateSessionPresenter,
  }

  return <AppContext.Provider value={providers}>{children}</AppContext.Provider>
}

export interface AppProviders {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  handleChangedName: Function
  socket: Socket
  session?: Session
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>
  webSocketState: string
  joinSession: (roomCode: string, navigationCallback?: () => void) => void
  createSession: (navigationCallback: (roomCode: string) => void) => void
  updateSessionUser: (updatedUser: User) => void
  updateSessionPresenter: (presenterId: number) => void
}

export default AppContext
