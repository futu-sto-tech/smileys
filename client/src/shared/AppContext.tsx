import React, { useState, useEffect, useRef, createContext } from 'react'
import { Socket, io } from 'socket.io-client'
import { Session, User } from '../@types/types'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

interface socketEvent {
  event: string
  params: any
}

const AppContext = createContext<any>(null)
const socket = io(import.meta.env.VITE_SERVER_ADDRESS)

export const AppProvider = ({ children }: { children: JSX.Element | undefined }) => {
  const [user, setUser] = useState<User>(obtainUser())
  const userName = useRef<string>('')
  userName.current = user ? user.name : ''
  const [needName, setNeedName] = useState(false)
  const [socketEventAfterName, setSocketEventAfterName] = useState<socketEvent>({ event: '', params: {} })
  const [webSocketState, setWebSocketState] = useState<string>('Loading Websocket...')
  const [session, setSession] = useState<Session>()
  const sessionRef = useRef<Session>()
  sessionRef.current = session
  const [activeSessionId, setActiveSessionId] = useState<string>()
  const navigate = useNavigate()

  function getMyActiveSessions() {
    socket.emit('findMyActiveSessions', { name: userName.current }, (sessionId: string) => {
      setActiveSessionId(sessionId)
    })
  }

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

  function joinSession(roomCode: string, navigateToRoom?: boolean) {
    if (!user.name) {
      setSocketEventAfterName({ event: 'joinSession', params: { code: roomCode, user } })
      setNeedName(true)
    } else {
      socket.emit('joinSession', { code: roomCode, user }, (session: Session) => {
        setSession(session)
        if (navigateToRoom) navigate('/' + session.code)
      })
    }
  }

  function createSession() {
    if (!user.name) {
      setSocketEventAfterName({ event: 'createSession', params: { user } })
      setNeedName(true)
    } else {
      socket.emit('createSession', { user }, (session: Session) => {
        setSession(session)
        navigate('/' + session.code)
      })
    }
  }

  function updateUser() {
    // TODO
  }

  function handleChangedName() {
    saveUser(user)
    if (socketEventAfterName.event) {
      socket.emit(socketEventAfterName.event, { ...socketEventAfterName.params, user }, (session: Session) => {
        setSession(session)
        setNeedName(false)
        setSocketEventAfterName({ event: '', params: {} })
        navigate('/' + session.code)
      })
    } else {
      setNeedName(false)
    }
  }

  const providers: AppProviders = {
    user,
    setUser,
    handleChangedName,
    socket,
    session: sessionRef.current,
    setSession,
    webSocketState,
    needName,
    setNeedName,
    joinSession,
    createSession,
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
  needName: boolean
  setNeedName: React.Dispatch<React.SetStateAction<boolean>>
  joinSession: (roomCode: string, navigateToRoom?: boolean) => void
  createSession: () => void
}

export default AppContext
