import { Socket } from 'socket.io-client'
import { Session, User } from './types'
import { ServerError } from './errors'

export interface IAppProvider {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  handleChangedName: Function
  socket: Socket
  session?: Session
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>
  webSocketState: string
  joinSession: (roomCode: string, callback?: () => void) => void
  createSession: (callback?: (roomCode: string) => void) => void
  createSessionWithCode: (code: string) => void
  updateSessionUser: (updatedUser: User, promoteToCreator?: boolean, callback?: () => void) => void
  updateSessionPresenter: (previous?: boolean) => void
  markUserAsPresented: (user: User) => void
  gifSearchTerm: string
  setGifSearchTerm: React.Dispatch<React.SetStateAction<string>>
  startGame: () => void
  deleteSession: () => void
  error: ServerError | undefined
}
