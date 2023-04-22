import React from 'react'
import classNames from 'classnames'
import ChevronLeft from 'src/svgs/ChevronLeft'
import ChevronRight from 'src/svgs/ChevronRight'
import { QueryConfig } from 'src/pages/ProductsList'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'

type Props = {
  queryConfig: QueryConfig
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

export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  let showFront = false
  let showBehind = false

  const renderDotFront = (index: number) => {
    if (index < page && index < page - range) {
      if (!showFront) {
        showFront = !showFront
        return (
          <div key={index} className='p-2 text-lg font-medium text-gray-500'>
            ...
          </div>
        )
      }
    }
    return null
  }

  const renderDotBehind = (index: number) => {
    if (index > page && index > page + range)
      if (!showBehind) {
        showBehind = !showBehind
        return (
          <div key={index} className='p-2 text-lg font-medium text-gray-500'>
            ...
          </div>
        )
      }
    return null
  }
  return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
        }}
        className={classNames('rounded bg-white p-2 transition-all', {
          'pointer-events-none': page === 1,
          'hover:border-gray-400/80 hover:bg-gray-100 hover:shadow': page !== 1
        })}
      >
        <ChevronLeft width={25} height={25} strokeWidth={1.5} strokeColor='#363535' />
      </Link>
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
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
                }}
                key={pageNumber}
                className={classNames(
                  'hover flex h-10 w-10 items-center justify-center rounded bg-white text-gray-600',
                  {
                    '!bg-orange !text-white': pageNumber === page
                  }
                )}
              >
                {pageNumber}
              </Link>
            )
          })}
      </div>
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
        }}
        className={classNames('rounded bg-white p-2 transition-all', {
          'pointer-events-none': page === pageSize,
          'hover:border-gray-400/80 hover:bg-gray-100 hover:shadow': page !== pageSize
        })}
      >
        <ChevronRight width={25} height={25} strokeWidth={1.5} strokeColor='#363535' />
      </Link>
    </div>
  )
}
