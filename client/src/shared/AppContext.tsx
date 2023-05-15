import React, { useState, useEffect, createContext } from 'react'
import { Socket, io } from 'socket.io-client'
import { Session, User } from '../types/types'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { IAppProvider } from '../types/AppContext'

interface socketEvent {
  event: string
  params: {}
}

const AppContext = createContext<any>(null)
const socket = io(import.meta.env.VITE_SERVER_ADDRESS)

export const AppProvider = ({ children }: { children: JSX.Element | undefined }) => {
  const [user, setUser] = useState<User>(obtainUser())
  const [gifSearchTerm, setGifSearchTerm] = useState<string>('')
  const [webSocketState, setWebSocketState] = useState<string>('Loading Websocket...')
  const [session, setSession] = useState<Session>()

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

  function updateSessionUser(updatedUser: User, promoteToCreator?: boolean) {
    if (!session) return
    setUser(updatedUser)
    socket.emit(
      'updateSessionUser',
      { code: session.code, user: updatedUser, promoteToCreator },
      (session: Session) => {
        setSession(session)
      }
    )
  }

  function updateSessionPresenter(presenterId: number) {
    if (!session) return
    socket.emit('updateSessionPresenter', { code: session.code, presenterId }, (session: Session) => {
      setSession(session)
    })
  }

  function handleStartGame() {
    if (!session) return
    socket.emit('startGame', { code: session.code, userId: user.id }, (session: Session) => {
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
    webSocketState,
    joinSession,
    createSession,
    updateSessionUser,
    updateSessionPresenter,
    gifSearchTerm,
    setGifSearchTerm,
  }

  return <AppContext.Provider value={providers}>{children}</AppContext.Provider>
}

export default AppContext
