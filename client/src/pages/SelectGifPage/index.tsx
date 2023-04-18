import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { useTrendingGifs } from '../../shared/gif_api'
import { useQueryClient } from 'react-query'
import { TrendingGifs } from '../../components/TrendingGifs'
import { Gif } from '../../components/Gif'
import { GifResult } from '../../@types/types'

function SelectGifPage() {
  const { session } = useContext(AppContext)
  let { roomId, gifId } = useParams()
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<GifResult[]>('trendingGifs')

  let url
  if (data) {
    url = data.find((gifResult) => {
      return gifResult.id == gifId
    })?.images.original.url
  }

  const temp =
    'https://media3.giphy.com/media/2C2qwckZzyiz8UzvzK/200w.gif?cid=96f63caf4dpcufofpo1w4benupnjkijfguss3tiab3tc5rbt&rid=200w.gif&ct=g'
  return <div>{url ? <Gif url={url}></Gif> : <p>Oops Couldn't find your gif</p>}</div>
}

export default SelectGifPage
