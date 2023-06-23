import { startServer } from './utils/startServer'

const init = async () => {
  try {
    await startServer()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

init()
