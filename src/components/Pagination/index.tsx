import React, { useState } from 'react'
import ChevronLeft from 'src/svgs/ChevronLeft'
import ChevronRight from 'src/svgs/ChevronRight'

type Props = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const range = 2

// algorithms
/**\
 * [1] 2 3 ... 19 20
 * 1 [2] 3 4 ... 19 20
 * 1 2 [3] 4 5 ... 19 20
 * 1 2 3 [4] 5 6 ... 19 20
 * 1 2 3 4 [5] 6 7 ... 19 20
 *
 * 1 2 ... 4 5 [6] 7 8 ... 19 20
 * 1 2 ... 8 9 [10] 11 12 ... 19 20
 * 1 2 ... 13 14 [15] 16 17 ... 19 20
 *
 * 1 2 ... 14 15 [16] 17 18 19 20
 * 1 2 ... 15 16 [17] 18 19 20
 * 1 2 ... 16 17 [18] 19 20
 * 1 2 ... 18 19 [20]
 */

export default function Pagination({ page, pageSize, setPage }: Props) {
  let showFront = false
  let showBehind = false

  const renderDotFront = (index: number) => {
    if (index < page && index < page - range) {
      if (!showFront) {
        showFront = !showFront
        return <div className='p-2 text-lg font-medium text-gray-500'>...</div>
      }
    }
    return null
  }

  const renderDotBehind = (index: number) => {
    if (index > page && index > page + range)
      if (!showBehind) {
        showBehind = !showBehind
        return <div className='p-2 text-lg font-medium text-gray-500'>...</div>
      }
    return null
  }
  return (
    <div className='flex flex-wrap items-center justify-center'>
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
        className={`${
          page === 1 ? 'cursor-not-allowed' : ''
        } rounded p-2 transition-all hover:border-gray-400/80 hover:shadow`}
      >
        <ChevronLeft width={25} height={25} strokeWidth={1.5} strokeColor='gray' />
      </button>
      <div className='flex flex-wrap items-center gap-2'>
        {Array(pageSize)
          .fill(0)
          .map((_, index) => {
            const pageNumber = index + 1
            if (page <= range * 2 + 1 && page < pageSize - range + 1 && pageNumber > page + 2) {
              if (pageNumber <= pageSize - range) return renderDotBehind(pageNumber)
            } else {
              if (pageNumber < page - 2 && pageNumber >= range + 1) {
                return renderDotFront(pageNumber)
              } else {
                if (pageNumber > page + 2 && pageNumber < pageSize - range + 1) {
                  return renderDotBehind(pageNumber)
                }
              }
            }
            return (
              <button
                key={index}
                onClick={() => setPage(pageNumber)}
                className={`${pageNumber === page ? '!border-cyan' : ''} rounded border-2 border-transparent p-3`}
              >
                {pageNumber}
              </button>
            )
          })}
      </div>
      <button
        disabled={page === pageSize}
        onClick={() => setPage((prev) => prev + 1)}
        className={`${
          page === pageSize ? 'cursor-not-allowed' : ''
        } rounded p-2 transition-all hover:border-gray-400/80 hover:shadow`}
      >
        <ChevronRight width={25} height={25} strokeWidth={1.5} strokeColor='gray' />
      </button>
    </div>
  )
}
