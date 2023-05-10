import Masonry from 'react-masonry-css'
import React from 'react'
import styles from './MasonryGrid.module.scss'

interface BaseT {
  id: number | string
}

interface Props<T extends BaseT> {
  columns?: number
  items: T[]
  children: (data: T) => React.ReactElement
}

function MasonryGrid<T extends BaseT>({ columns = 2, items, children }: Props<T>): React.ReactElement {
  return (
    <>
      <Masonry
        breakpointCols={{ default: columns, 756: columns - 1 }}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {items.map((item) => (
          <div key={item.id}>{children(item)}</div>
        ))}
      </Masonry>
    </>
  )
}

export default MasonryGrid
