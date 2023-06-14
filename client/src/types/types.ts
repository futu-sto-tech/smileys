export interface Session {
  id: string
  code: string
  users: User[]
  creator: User
  gameStarted: boolean
  presenterIndex: number
  presentOrder: User[]
}

export interface User {
  id: string
  name: string
  gifId: string
  presented: boolean
}

export interface GifResult {
  id: string
  images: {
    original: {
      url: string
      height: number
      width: number
    }
    fixed_width: {
      url: string
      height: number
    }
    fixed_width_downsampled: {
      url: string
      height: number
    }
    fixed_height: {
      url: string
      height: number
    }
  }
  title: string
}

export interface GiphyResult {
  data: GifResult[]
  pagination: {
    total_count: number
    count: number
    offset: number
  }
}

export interface InfiniteGifData {
  pages: GifResult[][]
}
