import { Socket } from 'socket.io'
import { Session, UserSocket, User } from '../types/session'
import { v4 as uuid } from 'uuid'
// import { Error400 } from '../types/error'
import _ from 'lodash'
import {
  addUserSocket,
  createUniqueCode,
  addUserToSession,
  getPrevPresenter,
  getNextPresenter,
  getNewPresenter,
} from './utils'

export let sessions: Session[] = []
export let userSockets: UserSocket[] = []

export const registerSessionHandlers = (ws: Socket) => {
  const createSession = (data: { user: User; code: string }, callback: any) => {
    addUserSocket(ws, userSockets, data.user)

    const user: User = { ...data.user }

    const session: Session = {
      id: uuid(),
      code: data.code ? data.code : createUniqueCode(),
      creator: user,
      users: [user],
      gameStarted: false,
      presenterIndex: 0,
      presentOrder: [],
    }
    sessions.push(session)
    ws.join(session.id)
    if (typeof callback == 'function') {
      callback(session)
    }
  }

  const joinSession = (data: { code: string; user: User }, callback: any) => {
    const session = sessions.find((session) => session.code === data.code)
    if (!session) {
      // ws.emit('error', new Error400('Invalid session code').getClientError())
      ws.emit('error')
      return
    }

    if (
      !session.users.find((user) => {
        return user.id === data.user.id
      })
    ) {
      addUserToSession(session, data.user)
    }

    addUserSocket(ws, userSockets, data.user)
    ws.join(session.id)
    ws.to(session.id).emit('sessionUpdated', session)
    if (typeof callback == 'function') {
      callback(session)
    }
  }

  const updateSessionUser = (data: { code: string; user: User; promoteToCreator?: boolean }, callback: any) => {
    const sessionIndex = sessions.findIndex((session) => session.code === data.code)
    if (sessionIndex === -1) {
      ws.send('Invalid session code')
      return
    }

    let session = sessions[sessionIndex]

    const userIndex = session.users.findIndex((user) => user.id === data.user.id)
    if (userIndex === -1) {
      ws.send('Invalid user')
      return
    }
    session.users[userIndex] = data.user

    if (data.promoteToCreator) session.creator = data.user

    session.users = session.users.sort((userA, userB) => (!!userA.gifId === !!userB.gifId ? 0 : !!userA.gifId ? -1 : 1))

    if (typeof callback == 'function') {
      callback(session)
    }

    ws.to(session.id).emit('sessionUpdated', session)
  }

  const updateSessionPresenter = (data: { code: string; previous: boolean }, callback: any) => {
    const sessionIndex = sessions.findIndex((session) => session.code === data.code)
    const session = sessions[sessionIndex]
    if (!sessionIndex && session) ws.send('Invalid session code')

    if (data.previous) {
      getPrevPresenter(session)
    } else {
      getNextPresenter(session)
    }
    ws.to(sessions[sessionIndex].id).emit('sessionUpdated', sessions[sessionIndex])
    if (typeof callback == 'function') {
      callback(sessions[sessionIndex])
    }
  }

  const leaveSession = (data: { code: string; userId: string }, callback: any) => {
    const sessionIndex = sessions.findIndex((session) => session.code === data.code)
    let session = sessions[sessionIndex]
    if (session) {
      const userIndex = session.users.findIndex((user) => user.id === data.userId)
      session.users.splice(userIndex, 1)
      if (session.users.length === 0) {
        sessions.splice(sessionIndex, 1)
      } else {
        ws.to(session.id).emit('sessionUpdated', session)
      }
      ws.leave(session.id)
      if (typeof callback == 'function') {
        callback()
      }
    } else {
      ws.send('Invalid session code')
    }
  }

  const deleteSession = (data: { code: string }, callback: any) => {
    const sessionIndex = sessions.findIndex((session) => session.code === data.code)
    const session = sessions[sessionIndex]
    sessions = sessions.filter((session) => {
      return session.code !== data.code
    })
    ws.to(session.id).emit('sessionDeleted', undefined)
    if (typeof callback == 'function') {
      callback(undefined)
    }
  }

  const startGame = (data: { code: string; userId: string }, callback: Function) => {
    const session = sessions.find((session) => session.code === data.code)
    if (!session) return ws.send('Session id not found')

    const userIsCreator = session.creator.id === data.userId
    if (!userIsCreator) return ws.send('Only the creator can start the game')

    getNewPresenter(session)

    session.gameStarted = true
    ws.to(session.id).emit('gameStarted', session)
    callback(session)
  }

  const rejoinSession = async (data: { userId: string; sessionId: string }, callback?: Function) => {
    await ws.join(data.sessionId)
    let userSocket = userSockets.find((userSocket) => userSocket.user.id === data.userId)
    if (userSocket) {
      userSocket.socket = ws
    } else {
      ws.send('Rejoin session failed')
      return
    }
    let session = sessions.find((session) => session.id === data.sessionId)
    if (session && session.gameStarted) {
      if (typeof callback == 'function') {
        callback(session)
      }
    } else {
      ws.send('Invalid session id')
    }
  }

  ws.on('createSession', createSession)
  ws.on('createSessionWithCode', createSession)
  ws.on('joinSession', joinSession)
  ws.on('updateSessionUser', updateSessionUser)
  ws.on('updateSessionPresenter', updateSessionPresenter)
  ws.on('leaveSession', leaveSession)
  ws.on('deleteSession', deleteSession)
  ws.on('startGame', startGame)
  ws.on('rejoinSession', rejoinSession)
}
