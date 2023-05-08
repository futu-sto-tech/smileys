/* existing imports */
import { Route } from 'react-router-dom'
import HomePage from './HomePage'
import RoomPage from './RoomPage'
import SelectGifPage from './SelectGifPage'

export const routes = [
  <Route path="/" element={<HomePage />} />,
  <Route path="/:roomId" element={<RoomPage />} />,
  <Route path="/:roomId/:gifId" element={<SelectGifPage />} />,
]
