import { useTrendingGifs } from '../../hooks/api/useTrendingGifs'
import { useQueryClient } from 'react-query'
import MasonryGrid from '../MasonryGrid'
import styles from './TrendingGifs.module.scss'
import { SelectableGif } from '../SelectableGif/Index'
import { useSearchGifs } from '../../hooks/api/useSearchGifs'
import { useContext } from 'react'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'

export function TrendingGifs({ className }: { className?: string }) {
  const { gifSearchTerm }: IAppProvider = useContext(AppContext)

  const { status, data, isSuccess } = useTrendingGifs()
  const { data: gifsSearchData, isSuccess: searchSuccess } = useSearchGifs(gifSearchTerm)

  const usedData = gifSearchTerm && searchSuccess ? gifsSearchData : data && isSuccess ? data : []
  // const usedData = gifSearchTerm && searchSuccess ? gifsSearchData : data && isSuccess ? data : []

  return (
    <div className={`${className} ${styles.trendingContainer}`}>
      {data || gifsSearchData ? (
        <MasonryGrid items={usedData} columns={3}>
          {(item): React.ReactElement => <SelectableGif url={item.images.fixed_width.url} id={item.id} />}
        </MasonryGrid>
      ) : (
        <p>Status: {status}</p>
      )}
    </div>
  )
}
