import { Router, Request, Response } from 'express'
import { Session, User } from '../types/session'
import { v4 as uuid } from 'uuid'

export let sessions: Session[] = []

const router = Router()

// Get all sessions
router.get('/', async (req: Request, res: Response) => {
  res.json(sessions)
})

// Get session
router.get('/:code', async (req: Request, res: Response) => {
  if (req.params.code == null) {
    res.status(400).json({ message: 'No session code provided' })
  }
  const session = sessions.find((session) => {
    return session.code == req.params.code
  })
  if (!session) {
    res.status(400).json({
      message: `Could not find session with session code ${req.params.code}`,
    })
  } else {
    res.json(session)
  }
})

// Create session
router.post('/:username', async (req: Request, res: Response) => {
  if (req.params.username == null) {
    res.status(400).json({ message: 'No username provided' })
  }
  const user: User = {
    id: uuid(),
    name: req.params.username,
  }
  const newSession = {
    id: uuid(),
    code: createUniqueCode(),
    creator: user,
    users: [user],
    gameStarted: false,
  }
  sessions.push(newSession)
  res.json(newSession)
})

// Add user to session
router.put('/:code/:username', async (req: Request, res: Response) => {
  if (!req.params.code) {
    res.status(400).json({ message: 'No session code provided' })
  }
  if (!req.params.username) {
    res.status(400).json({ message: 'No username provided' })
  }
  const sessionIndex = sessions.findIndex((session) => {
    return session.code == req.params.code
  })
  if (sessionIndex == -1) {
    res.status(400).json({
      message: `Could not find session with session code ${req.params.code}`,
    })
  } else {
    const user: User = {
      id: uuid(),
      name: req.params.username,
    }
    sessions[sessionIndex].users = [...sessions[sessionIndex].users, user]
    res.json(sessions[sessionIndex])
  }
})

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function createCode(): string {
  let code = ''
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length)
    code = code.concat(ALPHABET[randomIndex])
  }
  return code
}

function createUniqueCode(): string {
  let code = createCode()
  while (
    sessions.find((session) => {
      return session.code == code
    })
  ) {
    code = createCode()
  }
  return code
}

export default router
