export interface Session {
  id: string
  code: string
  users: User[]
  creator: User
  gameStarted: boolean
}

export interface User {
  id: string
  name: string
}
