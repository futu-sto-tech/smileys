import { useTrendingGifs } from '../../shared/gif_api'
import { useQueryClient } from 'react-query'
import MasonryGrid from '../MasonryGrid'
import styles from './TrendingGifs.module.scss'
import { SelectableGif } from '../SelectableGif/Index'

export function TrendingGifs() {
  const { status, data, error, isFetching } = useTrendingGifs()

  return (
    <div className={styles.trendingContainer}>
      {status == 'success' ? (
        <MasonryGrid items={data} columns={3}>
          {(item): React.ReactElement => <SelectableGif url={item.images.fixed_width.url} id={item.id} />}
        </MasonryGrid>
      ) : (
        <p>Status: {status}</p>
      )}
    </div>
  )
}
