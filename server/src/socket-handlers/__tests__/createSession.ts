import { beforeEach, describe } from 'node:test'
import { startServer } from '../../utils/startServer'

describe('createSession', () => {
  beforeEach(async () => {
    await startServer()
  })

  it('should create a session', async () => {
    expect(true).toBe(true)
  })
})
