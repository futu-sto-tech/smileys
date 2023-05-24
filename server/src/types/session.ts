import { Socket } from 'socket.io'

export interface Session {
  id: string
  code: string
  users: User[]
  creator: User
  gameStarted: boolean
  presenterIndex: number
}

export interface UserSocket {
  socket: Socket<any> // TODO fix type
  user: User
}

export interface User {
  id: string
  name: string
  gifId?: string
}
