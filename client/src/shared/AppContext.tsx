import React, { useState, useEffect, useRef, createContext } from 'react'
import { Socket, io } from 'socket.io-client'
import { Session, User } from '../@types/types'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

const AppContext = createContext<any>(null)
const socket = io(import.meta.env.VITE_SERVER_ADDRESS)

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User>(obtainUser())
  const userName = useRef<string>('')
  userName.current = user ? user.name : ''
  const [needName, setNeedName] = useState(false)
  const [webSocketState, setWebSocketState] = useState<string>('Loading Websocket...')
  const [session, setSession] = useState<Session>()
  const sessionRef = useRef<Session>()
  sessionRef.current = session
  const [activeSessionId, setActiveSessionId] = useState<string>()
  const navigate = useNavigate()

  const providers = {
    user,
    setUser,
    saveUser,
    socket,
    session: sessionRef.current,
    setSession,
    webSocketState,
    needName,
    setNeedName,
  }

  function getMyActiveSessions() {
    socket.emit('findMyActiveSessions', { name: userName.current }, (sessionId: string) => {
      setActiveSessionId(sessionId)
    })
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected')
      setWebSocketState('Connected to Websocket')
      if (sessionRef.current) {
        socket.emit('rejoinSession', { name: userName.current, sessionId: sessionRef.current.id })
      }
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

  useEffect(() => {
    if (session && session.code && user.name) {
      navigate('/' + session?.code)
    }
  }, [session?.code])

  function obtainUser(): User {
    const userJSON = localStorage.getItem('user')
    if (!userJSON) {
      return { name: '', id: uuid() }
    }
    return JSON.parse(userJSON)
  }

  function saveUser(user: User) {
    setNeedName(false)
    localStorage.setItem('user', JSON.stringify(user))
    if (session && session.code && user.name) {
      navigate('/' + session?.code)
    }
  }

  return <AppContext.Provider value={providers}>{children}</AppContext.Provider>
}

export default AppContext
