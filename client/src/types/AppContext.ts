import { Socket } from 'socket.io-client'
import { Session, User } from './types'
import { ServerError } from './errors'

export interface IAppProvider {
  user: User
  handleChangedName: (name: string) => void
  socket: Socket
  session?: Session
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>
  sessionEnded: boolean
  setSessionEnded: React.Dispatch<React.SetStateAction<boolean>>
  webSocketState: string
  joinSession: (roomCode: string, callback?: () => void) => void
  createSession: (callback?: (roomCode: string) => void) => void
  createSessionWithCode: (code: string) => void
  updateSessionUser: (updatedUser: User, promoteToCreator?: boolean, callback?: () => void) => void
  updateSessionPresenter: (previous?: boolean) => void
  gifSearchTerm: string
  setGifSearchTerm: React.Dispatch<React.SetStateAction<string>>
  startGame: () => void
  deleteSession: () => void
  error: ServerError | undefined
}
