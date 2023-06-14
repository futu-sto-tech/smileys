import { useTrendingGifs } from '../../hooks/api/useTrendingGifs'
import MasonryGrid from '../MasonryGrid'
import styles from './GifList.module.scss'
import { SelectableGif } from '../SelectableGif/Index'
import { useSearchGifs } from '../../hooks/api/useSearchGifs'
import { useContext, useEffect, useRef, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'
import { useDebounce } from '../../hooks/useDebounce'
import { GifResult, Session } from '../../types/types'
import classNames from 'classnames'
import { sortDataOnHeightAga } from './utils'
import { TrendingIcon } from '../SVGs/Icons'

const COLUMNS = 3

interface GifListProps {
  className?: string
  session: Session
}

export function GifList({ className, session }: GifListProps) {
  const { gifSearchTerm }: IAppProvider = useContext(AppContext)

  const debouncedSearch = useDebounce(gifSearchTerm, 500)
  const { status, data, fetchNextPage } = gifSearchTerm ? useSearchGifs(debouncedSearch) : useTrendingGifs()
  const scrollRef = useRef(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(([entry]) => {
      fetchNextPage()
    }, options)

    if (scrollRef.current) {
      observer.observe(scrollRef.current)
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current)
      }
    }
  }, [])

  function unpackGifs(data: any): GifResult[] {
    if (!data || !data.pages) return []
    const unpackedData: GifResult[] = []
    for (const page of data.pages) {
      for (const gifResult of page.data) unpackedData.push(gifResult)
    }
    return sortDataOnHeightAga(unpackedData, COLUMNS)
  }

  return (
    <div>
      {!gifSearchTerm && (
        <p className={styles.title}>
          <span>
            <TrendingIcon />
          </span>{' '}
          Trending Gifs
        </p>
      )}

      <div className={classNames([className, styles.gifContainer])}>
        {data ? (
          <MasonryGrid items={unpackGifs(data)} columns={COLUMNS}>
            {(item): React.ReactElement => (
              <SelectableGif
                session={session}
                downsampled_url={item.images.fixed_width_downsampled.url}
                original_url={item.images.original.url}
                height={item.images.fixed_width_downsampled.height}
                id={item.id}
              />
            )}
          </MasonryGrid>
        ) : (
          <p>Status: {status}</p>
        )}
      </div>
      <div ref={scrollRef} className={styles.scrollMargin} />
    </div>
  )
}
