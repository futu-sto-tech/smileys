import { GifResult } from '../../types/types'

export function sortDataOnHeight(data: GifResult[], columns: number) {
  const sortedData: GifResult[] = []

  let columnHeights: number[] = []
  for (let i = 0; i < columns; i++) {
    columnHeights.push(0)
  }

  for (let i = 0; i < data.length; i += columns) {
    const row = data.slice(i, i + columns)
    if (row.length < columns) {
      sortedData.push(...row)
      continue
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
  }
  //sortedData.push(...data.slice(Math.floor(data.length / columns)))
  return sortedData
}
