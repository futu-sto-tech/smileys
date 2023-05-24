// Typing of below happens in env.d.ts
const envVars = {
  PORT: import.meta.env.VITE_SERVER_ADDRESS,
  ENVIRONMENT: import.meta.env.VITE_SERVER_ADDRESS,
  VITE_SERVER_ADDRESS: import.meta.env.VITE_SERVER_ADDRESS,
}

Object.entries(envVars).forEach(([key, value]) => {
  if (!value) throw new Error(`Environment variable ${key} is not set`)
})

export const { PORT, ENVIRONMENT, VITE_SERVER_ADDRESS } = envVars
