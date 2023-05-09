export interface Session {
  id: string
  code: string
  users: User[]
  creator: User
  gameStarted: boolean
  presenterIndex: number
}

export interface User {
  id: string
  name: string
  gifId: string
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
    fixed_width_downsampled: {
      url: string
    }
  }
  title: string
}
