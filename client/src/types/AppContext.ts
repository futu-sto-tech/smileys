import { Socket } from 'socket.io-client'
import { Session, User } from './types'

export interface IAppProvider {
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
  updateSessionUser: (updatedUser: User) => void
  updateSessionPresenter: (presenterId: number) => void
}
