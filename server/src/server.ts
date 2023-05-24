import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import express, { Express, Request, Response } from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import { networkInterfaces } from 'os'
// import sessionsRouter from './routes/sessions'
import { logError } from './middleware/error/logError'
import { returnError } from './middleware/error/returnError'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types/websocket'
import { registerSessionHandlers } from './socket-handlers/sessionHandlers'
import rootRouter from './routes/sessions'

const app: Express = express()
const server = createServer(app)
const nets = networkInterfaces()
let localAddr: string

try {
  localAddr = nets.en0?.find((net) => net.family === 'IPv4')?.address ?? 'localhost'
} catch (error) {
  console.log('Could not get local IP')
}

const port: number = process.env.PORT ? +process.env.PORT : 8999
server.listen(port, () => {
  console.log(`Server started on http://${localAddr}:${port}`)
})
// .on('error', function (err) {
//   process.once('SIGUSR2', function () {
//     process.kill(process.pid, 'SIGUSR2')
//   })
//   process.on('SIGINT', function () {
//     // this is only called on ctrl+c, not restart
//     process.kill(process.pid, 'SIGINT')
//   })
// })

// ****** HTTP STUFF ******

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use('/sessions', sessionsRouter)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript server running')
})
app.use('/', rootRouter)
app.use(logError)
app.use(returnError)

// ****** WEBSOCKET STUFF *******

const clients: Socket[] = []

const wss = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: {
    origin: process.env.ORIGIN,
  },
})

wss.on('connection', (ws: Socket) => {
  clients.push(ws)
  console.log('Connected:', ws.id.substring(0, 3))
  registerSessionHandlers(wss, ws)

  ws.on('disconnect', () => {
    console.log('Disconnected:', ws.id.substring(0, 3))
    const i = clients.indexOf(ws)
    clients.splice(i, 1)
  })

  ws.onAny((eventName) => {
    console.log('Event:', eventName)
  })
})
