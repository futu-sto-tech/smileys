import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext, { AppProviders } from '../../shared/AppContext'
import { useGifById } from '../../shared/gif_api'
import { useQueryClient } from 'react-query'
import { TrendingGifs } from '../../components/TrendingGifs'
import { Gif } from '../../components/Gif'
import { GifResult } from '../../@types/types'
import styles from './SelectGifPage.module.scss'
import { Button } from '../../components/Button'

function GifFetcher({ gifId }: { gifId: string }) {
  const queryClient = useQueryClient()
  const cachedGifData = queryClient.getQueryData<GifResult[]>('trendingGifs')

  let url
  if (cachedGifData) {
    url = cachedGifData.find((gifResult) => {
      return gifResult.id == gifId
    })?.images.original.url
  }

  if (!url) {
    const { status, data, error, isFetching } = useGifById(gifId)
    if (data) url = data.images.original.url
  }
  return (
    <div>
      {url ? (
        <div>
          <Gif url={url}></Gif>
        </div>
      ) : (
        <div>oops couldnt find your gif</div>
      )}
    </div>
  )
}

export default GifFetcher
