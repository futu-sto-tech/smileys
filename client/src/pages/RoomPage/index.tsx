import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { useTrendingGifs } from '../../shared/gif_api'
import { useQueryClient } from 'react-query'
import { TrendingGifs } from '../../components/TrendingGifs'

function RoomPage() {
  const { session } = useContext(AppContext)
  let { roomId } = useParams()
  return (
    <div>
      <p>This this is room {roomId}</p>
      <TrendingGifs />
      {session && (
        <>
          <h1>Session:</h1>
          <p>Code: {session.code}</p>
          <p>Creator: {session.creator.name}</p>
          <p>
            Participants:{' '}
            {session.users.map((user: { name: string }) => {
              return user.name + ', '
            })}
          </p>
        </>
      )}
    </div>
  )
}

export default RoomPage
