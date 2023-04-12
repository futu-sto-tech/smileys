import React, { useState, useEffect, useRef, createContext } from 'react'
import { Socket, io } from 'socket.io-client'
import { Session, User } from '../@types/types'
import { useNavigate } from 'react-router-dom'

const WebSocketContext = createContext<any>(null)
const socket = io(import.meta.env.VITE_SERVER_ADDRESS)

export const WebSocketProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User>({ id: '', name: 'Mr. Unconnected' })
  const userName = useRef<string>('')
  userName.current = user.name
  const [webSocketState, setWebSocketState] = useState<string>('Loading Websocket...')
  const [session, setSession] = useState<Session>()
  const sessionRef = useRef<Session>()
  sessionRef.current = session
  const [activeSessionId, setActiveSessionId] = useState<string>()
  const navigate = useNavigate()

  const providers = {
    socket,
    session: sessionRef.current,
    setSession,
    webSocketState,
  }

  function getMyActiveSessions() {
    socket.emit('findMyActiveSessions', { name: userName.current }, (sessionId: string) => {
      setActiveSessionId(sessionId)
    })
  }

  useEffect(() => {
    console.log(socket)
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
    if (session && session.code) {
      navigate('/' + session?.code)
    }
  }, [session?.code])

  return <WebSocketContext.Provider value={providers}>{children}</WebSocketContext.Provider>
}

export default WebSocketContext
