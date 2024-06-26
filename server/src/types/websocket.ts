import { Server } from 'socket.io'

export type WebSocketServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

export interface ClientToServerEvents {
  hello: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  id: string
}
