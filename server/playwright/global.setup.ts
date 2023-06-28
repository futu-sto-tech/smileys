import { startServer } from '../src/utils/startServer'

export const init = async () => {
  try {
    await startServer()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

init()
