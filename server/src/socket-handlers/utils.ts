import _ from 'lodash'
import { Session, User, UserSocket } from '../types/session'
import { sessions } from './sessionHandlers'
import { Socket } from 'socket.io'

export const getNextPresenter = (session: Session) => {
  const presenter = session.users[session.presenterIndex]
  if (presenter.id === session.presentOrder[session.presentOrder.length - 1].id) {
    getNewPresenter(session)
  } else {
    const currentPresenterOrderIndex = session.presentOrder.findIndex((user) => user.id === presenter.id)
    const nextPresenter = session.presentOrder[currentPresenterOrderIndex + 1]
    session.presenterIndex = session.users.findIndex((user) => user.id === nextPresenter.id)
  }
}

export const getNewPresenter = (session: Session) => {
  const presenter = _.sample(
    session.users
      .filter((user) => !!user.gifId)
      .filter((user) => {
        return !session.presentOrder.find((userPresenter) => {
          return userPresenter.id == user.id
        })
      })
  )

  if (presenter) {
    session.presentOrder.push(presenter)
    const presenterIndex = session.users.findIndex((user) => user.id === presenter.id)
    session.presenterIndex = presenterIndex !== -1 ? presenterIndex : session.presenterIndex + 1
  }
}

export const getPrevPresenter = (session: Session) => {
  const presenter = session.users[session.presenterIndex]
  const currentPresenterOrderIndex = session.presentOrder.findIndex((user) => user.id === presenter.id)

  if (currentPresenterOrderIndex) {
    const previousPresenter = session.presentOrder[currentPresenterOrderIndex - 1]
    session.presenterIndex = session.users.findIndex((user) => user.id === previousPresenter.id)
  }
}

export const addUserToSession = (session: Session, newUser: User) => {
  if (
    !session.users.find((user) => {
      return newUser.id === user.id
    })
  ) {
    session.users.push(newUser)
  }
}

export const addUserSocket = (ws: Socket, userSockets: UserSocket[], user: User) => {
  const newUserSockets = userSockets.filter((userSocket) => {
    return userSocket.user.id !== user.id
  })
  newUserSockets.push({
    socket: ws,
    user: user,
  })
  userSockets = newUserSockets
}

export const logSessions = () => {
  for (const session of sessions) {
    console.log(
      `code=${session.code}, users=${session.users.map((user) => user.name)}, gameStarted=${session.gameStarted} id=${
        session.id
      }`
    )
  }
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const createCode = (): string => {
  let code = ''
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length)
    code = code.concat(ALPHABET[randomIndex])
  }
  return code
}

export const createUniqueCode = (): string => {
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
