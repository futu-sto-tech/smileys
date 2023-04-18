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

export interface GifResult {
  id: string
  images: {
    original: {
      url: string
    }
    fixed_width: {
      url: string
    }
  }
  title: string
}
