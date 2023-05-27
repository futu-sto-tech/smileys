import { Room } from '@prisma/client'
import { Session, User } from '../types/session'
import { Prisma } from '../db/client'
import { v4 as uuid } from 'uuid'

export interface CreateRoomData {
  code: string
}

export async function createRoom({ code }: CreateRoomData): Promise<any> {
  const room = {
    // Temporary code
    code,
    // creator: data.user,
    // users: [data.user],
    // gameStarted: false,
    // presenterIndex: 0,
  }

  const savedRoom = Prisma.room.create({ data: room })
  return savedRoom
}
