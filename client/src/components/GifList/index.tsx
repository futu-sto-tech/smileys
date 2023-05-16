import { useTrendingGifs } from '../../hooks/api/useTrendingGifs'
import MasonryGrid from '../MasonryGrid'
import styles from './GifList.module.scss'
import { SelectableGif } from '../SelectableGif/Index'
import { useSearchGifs } from '../../hooks/api/useSearchGifs'
import { useContext } from 'react'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'
import { useDebounce } from '../../hooks/useDebounce'
import { Session } from '../../types/types'
import classNames from 'classnames'

interface GifListProps {
  className?: string
  session: Session
}

export function GifList({ className, session }: GifListProps) {
  const { gifSearchTerm }: IAppProvider = useContext(AppContext)

  const { status, data, isSuccess } = useTrendingGifs()
  const debouncedSearch = useDebounce(gifSearchTerm, 500)
  const { data: gifsSearchData, isSuccess: searchSuccess } = useSearchGifs(debouncedSearch)

  const usedData = gifSearchTerm && searchSuccess ? gifsSearchData : data && isSuccess ? data : []

  return (
    <div className={classNames([className, styles.gifContainer])}>
      {data || gifsSearchData ? (
        <MasonryGrid items={usedData} columns={3}>
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
  )
}
