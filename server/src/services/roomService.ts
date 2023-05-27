import { Room } from '@prisma/client'
import { Session, User } from '../types/session'
import { Prisma } from '../db/client'
import { v4 as uuid } from 'uuid'
import { sessions } from '../socket-handlers/sessionHandlers'
import GenerateRandomName from 'js-random-animal-name-generator'

export interface CreateRoomData {
  code: string
}

export async function createRoom(): Promise<any> {
  try {
    return generateUniqueCode()
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('code_unique_index')) {
      return generateUniqueCode()
    }
    throw error
  }
}

const customFormatter = (data: string[]): string => {
  return data.filter((word, i) => i > 2).join('-')
}

async function generateUniqueCode() {
  const animalName = GenerateRandomName(undefined, 0) as string
  return await Prisma.room.create({ data: { code: animalName } })
}
