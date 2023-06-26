import { beforeEach, describe } from 'node:test'
import { startServer } from '../../utils/startServer'
import { User } from '../../types/session'
import { v4 as uuid } from 'uuid'
import { WebSocketServer } from '../../types/websocket'

describe('createSession', () => {
  let wss: WebSocketServer

  beforeEach(async () => {
    wss = (await startServer()).webSocketServer
  })

  it('should create a session and add user to it', async () => {
    // Arrange
    const user: User = {
      id: uuid(),
      name: 'John Doe',
      gifId: 'chzz1FQgqhytWRWbp3',
      gifThumbnailUrl:
        'https://media2.giphy.com/media/hHifLbLhEloqfDwWs0/480w_s.jpg?cid=500108beb0d2932fdf8398b12edd05c6ab990554de3cca0b&ep=v1_gifs&rid=480w_s.jpg&ct=g',
    }

    const code = 'ABCD'

    const data = { user, code }

    // Act
    // Assert
  })
})
