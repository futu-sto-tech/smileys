import { Server, Socket } from 'socket.io'
import { Session, UserSocket, User } from '../types/session'
import { v4 as uuid } from 'uuid'

export let sessions: Session[] = []
export let userSockets: UserSocket[] = []

export const registerSessionHandlers = (wss: Server, ws: Socket) => {
  const findMyActiveSessions = (data: { name: string }, callback: any) => {
    const activeSession = sessions
      .filter((session) => session.gameStarted)
      .find((session) => session.users.find((user) => user.name === data.name))
    if (activeSession) {
      callback(activeSession.code)
    } else {
      callback()
    }
  }

  const createSession = (data: { name: string }, callback: any) => {
    const user: User = {
      id: uuid(),
      name: data.name,
    }
    addUserSocket(ws, user)

    const session: Session = {
      id: uuid(),
      code: createUniqueCode(),
      creator: user,
      users: [user],
      gameStarted: false,
    }
    sessions.push(session)
    ws.join(session.id)
    if (typeof callback == 'function') {
      callback(session)
    }
  }

  const joinSession = (data: { code: string; name: string }, callback: any) => {
    let session = sessions.find((session) => session.code === data.code)
    if (session) {
      const user: User = {
        id: uuid(),
        name: data.name,
      }
      addUserSocket(ws, user)
      addUserToSession(session, user)
      ws.join(session.id)
      ws.to(session.id).emit('sessionUpdated', session)
      if (typeof callback == 'function') {
        callback(session)
      }
    } else {
      ws.send('Invalid session code')
    }
  }

  const leaveSession = (data: { code: string; name: string }, callback: any) => {
    const sessionIndex = sessions.findIndex((session) => session.code === data.code)
    let session = sessions[sessionIndex]
    if (session) {
      const userIndex = session.users.findIndex((user) => user.name === data.name)
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

  const disbandSession = (data: { code: string }) => {
    const sessionIndex = sessions.findIndex((session) => session.code === data.code)
    if (sessionIndex > -1) {
      wss.in(sessions[sessionIndex].id).emit('sessionUpdated', null)
      sessions.splice(sessionIndex, 1)
    }
  }

  const startGame = (data: { sessionId: string }) => {
    const session = sessions.find((session) => session.id === data.sessionId)
    if (session) {
      session.gameStarted = true
      ws.to(session.id).emit('gameStarted')
    } else {
      ws.send('Session id not found')
    }
  }

  const rejoinSession = async (data: { name: string; sessionId: string }, callback: any) => {
    await ws.join(data.sessionId)
    let userSocket = userSockets.find((userSocket) => userSocket.user.name === data.name)
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

  ws.on('findMyActiveSessions', findMyActiveSessions)
  ws.on('createSession', createSession)
  ws.on('joinSession', joinSession)
  ws.on('leaveSession', leaveSession)
  ws.on('disbandSession', disbandSession)
  ws.on('startGame', startGame)
  ws.on('rejoinSession', rejoinSession)
}

const addUserToSession = (session: Session, newUser: User) => {
  const newUsers = session.users.filter((user) => {
    return user.name !== newUser.name
  })
  newUsers.push(newUser)
  session.users = newUsers
}

const addUserSocket = (ws: any, user: User) => {
  const newUserSockets = userSockets.filter((userSocket) => {
    return userSocket.user.name !== user.name
  })
  newUserSockets.push({
    socket: ws,
    user: user,
  })
  userSockets = newUserSockets
}

const logSessions = () => {
  for (const session of sessions) {
    console.log(
      `code=${session.code}, users=${session.users.map((user) => user.name)}, startedTracking=${
        session.gameStarted
      } id=${session.id}`
    )
  }
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const createCode = (): string => {
  let code = ''
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length)
    code = code.concat(ALPHABET[randomIndex])
  }
  return code
}

const createUniqueCode = (): string => {
  let code = createCode()
  while (
    sessions.find((session) => {
      return session.code == code
    })
  ) {
    code = createCode()
  }
  return code
}