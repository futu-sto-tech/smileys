import { Router, Request, Response } from 'express'
import { sessions } from '../socket-handlers/sessionHandlers'
import { Error400 } from '../types/error'
import { StatusCodes } from 'http-status-codes'

const rootRouter = Router()

rootRouter.post('/session-exists', async (req: Request, res: Response) => {
  const data = req.body
  const session = sessions.find((session) => session.code === data.code)
  if (!session) throw new Error400('Invalid session code')

  res.status(StatusCodes.OK).json(session)
})

export default rootRouter

// DEPRECATED BELOW

// export let sessions: Session[] = []

// const router = Router()

// // Get all sessions
// router.get('/', async (req: Request, res: Response) => {
//   res.json(sessions)
// })

// // Get session
// router.get('/:code', async (req: Request, res: Response) => {
//   if (req.params.code == null) {
//     res.status(400).json({ message: 'No session code provided' })
//   }
//   const session = sessions.find((session) => {
//     return session.code == req.params.code
//   })
//   if (!session) {
//     res.status(400).json({
//       message: `Could not find session with session code ${req.params.code}`,
//     })
//   } else {
//     res.json(session)
//   }
// })

// // Create session
// router.post('/:username', async (req: Request, res: Response) => {
//   // Feedback:
//   // This is the controller, and preferably, things should be validated and serialized etc so that the
//   // controller can do the business logic.

//   // Feedback: Can be rewritten to ( see below):
//   if (req.params.username == null) {
//     res.status(400).json({ message: 'No username provided' })
//   }

//   // To:
//   // if (!req.params.username) res.status(400).json({ message: 'No username provided' })

//   const user: User = {
//     id: uuid(),
//     name: req.params.username,
//   }
//   // Feedback: spaces between blocks

//   const newSession = {
//     id: uuid(),
//     code: createUniqueCode(),
//     creator: user,
//     users: [user],
//     gameStarted: false,
//   }

//   sessions.push(newSession)
//   res.json(newSession)
// })

// // Add user to session
// router.put('/:code/:username', async (req: Request, res: Response) => {
//   if (!req.params.code) {
//     res.status(400).json({ message: 'No session code provided' })
//   }

//   if (!req.params.username) {
//     res.status(400).json({ message: 'No username provided' })
//   }
//   const sessionIndex = sessions.findIndex((session) => {
//     return session.code == req.params.code
//   })

//   if (sessionIndex == -1) {
//     res.status(400).json({
//       message: `Could not find session with session code ${req.params.code}`,
//     })
//   } else {
//     const user: User = {
//       id: uuid(),
//       name: req.params.username,
//     }
//     sessions[sessionIndex].users = [...sessions[sessionIndex].users, user]
//     res.json(sessions[sessionIndex])
//   }
// })

// const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// function createCode(): string {
//   console.log('test')

//   let code = ''
//   for (let i = 0; i < 4; i++) {
//     const randomIndex = Math.floor(Math.random() * ALPHABET.length)
//     code = code.concat(ALPHABET[randomIndex])
//   }
//   return code
// }

// function createUniqueCode(): string {
//   let code = createCode()
//   while (
//     sessions.find((session) => {
//       return session.code == code
//     })
//   ) {
//     code = createCode()
//   }
//   return code
// }

// export default router
