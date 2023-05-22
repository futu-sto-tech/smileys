import { GifResult } from '../../types/types'
import _ from 'lodash'

export function sortDataOnHeight(data: GifResult[], columns: number) {
  const sortedData: GifResult[] = []

  let columnHeights: number[] = []
  for (let i = 0; i < columns; i++) {
    columnHeights.push(0)
  }
  data.forEach((_, i) => {
    if (i % columns) {
      return
    }
    const row = data.slice(i, i + columns)

    if (row.length < columns) {
      sortedData.push(...row)
      return
    }

    let sortedColumnHeights = columnHeights.sort()

    console.log({ sortedColumnHeights })
    const indexArray = columnHeights.map((height) => {
      const pop = sortedColumnHeights.indexOf(height)
      sortedColumnHeights[sortedColumnHeights.indexOf(height)] = -1
      return pop
    })
    const sortedRow: GifResult[] = []
    indexArray.forEach((index) => sortedRow.push(row[index]))
    sortedRow.forEach((gifResult, index) => {
      columnHeights[index] += Number(gifResult.images.fixed_width.height)
    })
    console.log({ sortedColumnHeights, indexArray, sortedRow, columnHeights })
    sortedData.push(...sortedRow)
  })
  //sortedData.push(...data.slice(Math.floor(data.length / columns)))
  return sortedData
}

export function sortDataOnHeightAga(data: GifResult[], columns: number) {
  let columnHeight = Array.of(Array(columns)).map(() => 0)
  const rowInit = Array.of(Array(columns)).map(() => null)
  let res: GifResult[] = []

  for (let i = 0; i < data.length; i += columns) {
    let columnHeightWithIndex = columnHeight.map((h, idx) => ({ height: h, colIdx: idx }))
    columnHeightWithIndex = _.orderBy(columnHeightWithIndex, (h) => h.height, 'asc')

    let currentGifs = data.slice(i, i + columns)
    currentGifs = _.orderBy(currentGifs, (g) => g.images.fixed_width.height, 'desc')
    const row: (GifResult | null)[] = rowInit
    columnHeightWithIndex.forEach((c, idx) => (row[c.colIdx] = currentGifs[idx]))

    row.forEach((c, idx) => {
      if (c) {
        res.push(c)
        columnHeight[idx] += Number(c.images.fixed_width.height)
      }
    })
  }
  return res
}
