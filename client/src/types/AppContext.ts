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
  joinSession: (roomCode: string, navigationCallback?: () => void) => void
  createSession: (navigationCallback?: (roomCode: string) => void) => void
  updateSessionUser: (updatedUser: User, promoteToCreator?: boolean) => void
  updateSessionPresenter: (presenterId: number) => void
  gifSearchTerm: string
  setGifSearchTerm: React.Dispatch<React.SetStateAction<string>>
  startGame: () => void
  error: ServerError | undefined
}
