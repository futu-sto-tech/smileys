const { env } = process

const envVars = {
  PORT: env.PORT!,
  ENVIRONMENT: env.ENVIRONMENT!,
  VITE_SERVER_ADDRESS: env.VITE_SERVER_ADDRESS!,
}

Object.entries(envVars).forEach(([key, value]) => {
  if (!value) throw new Error(`Environment variable ${key} is not set`)
})

export const { PORT, ENVIRONMENT, VITE_SERVER_ADDRESS } = envVars
