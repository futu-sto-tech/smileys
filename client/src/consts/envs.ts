// Typing of below happens in env.d.ts
const envVars = {
  PORT: import.meta.env.VITE_SERVER_ADDRESS,
  ENVIRONMENT: import.meta.env.VITE_SERVER_ADDRESS,
  VITE_SERVER_ADDRESS: import.meta.env.VITE_SERVER_ADDRESS,
  TRACKING_ID: import.meta.env.VITE_TRACKING_ID,
}

Object.entries(envVars).forEach(([key, value]) => {
  if (!value && key !== 'TRACKING_ID') throw new Error(`Environment variable ${key} is not set`)
})

export const { PORT, ENVIRONMENT, VITE_SERVER_ADDRESS, TRACKING_ID } = envVars
