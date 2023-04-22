import { omit } from 'lodash'
import classnames from 'classnames'
import path from 'src/constants/path'
import Button from 'src/components/Button'
import ChevronLeft from 'src/svgs/ChevronLeft'
import ChevronRight from 'src/svgs/ChevronRight'
import { QueryConfig } from 'src/pages/ProductsList'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { GetProductsConfig, SortBy, Order } from 'src/types/product.type'

type Props = {
  queryConfig: QueryConfig
  pageSize: number
}

export default function Sort({ queryConfig, pageSize }: Props) {
  const navigate = useNavigate()
  const page = Number(queryConfig.page)
  const { sort_by = SortBy.CREATED_AT, order } = queryConfig

  const isActive = (sortByValue: Exclude<GetProductsConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSortBy = (sortByValue: Exclude<GetProductsConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          'order'
        )
      ).toString()
    })
  }

  const handleSortByPrice = (orderValue: Exclude<GetProductsConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: SortBy.PRICE,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='rounded-sm bg-gray-300/60 shadow'>
      <div className='flex flex-wrap items-center justify-between px-4 text-sm font-light'>
        <div className='flex flex-wrap items-center gap-3 py-3'>
          <p>Sắp xếp theo</p>
          <Button
            onClick={() => handleSortBy(SortBy.VIEW)}
            className={classnames('rounded-sm bg-white px-4 py-2 transition-all', {
              '!bg-orange text-white': isActive(SortBy.VIEW)
            })}
          >
            <span className='w-full capitalize'>phổ biến</span>
          </Button>
          <Button
            onClick={() => handleSortBy(SortBy.CREATED_AT)}
            className={classnames('rounded-sm bg-white px-4 py-2 transition-all', {
              '!bg-orange text-white': isActive(SortBy.CREATED_AT)
            })}
          >
            <span className='w-full capitalize'>mới nhất</span>
          </Button>
          <Button
            onClick={() => handleSortBy(SortBy.SOLD)}
            className={classnames('rounded-sm bg-white px-4 py-2 transition-all', {
              '!bg-orange text-white': isActive(SortBy.SOLD)
            })}
          >
            <span className='w-full capitalize'>bán chạy</span>
          </Button>
          <select
            value={order || ''}
            className={classnames('w-44 rounded-sm bg-white py-2 text-left outline-none', {
              '!bg-orange text-white': isActive(SortBy.PRICE)
            })}
            onChange={(event) =>
              handleSortByPrice(event.target.value as Exclude<GetProductsConfig['order'], undefined>)
            }
          >
            <option value='' disabled className='bg-white text-gray-700'>
              Giá
            </option>
            <option value={Order.ASC} className='bg-white text-gray-700'>
              Giá: Thấp đến Cao
            </option>
            <option value={Order.DESC} className='bg-white text-gray-700'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center gap-3 py-3'>
          <p>
            <span className='text-orange'>{page}</span>/<span>{pageSize}</span>
          </p>
          <div className='flex items-center'>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
              }}
              className={classnames('rounded-tl-sm rounded-bl-sm bg-white p-2.5 text-[#555] transition-all', {
                'pointer-events-none bg-gray-200 p-2.5 text-gray-400': page === 1
              })}
            >
              <ChevronLeft />
            </Link>
            <div className='w-[1px]'></div>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
              }}
              className={classnames(
                'rounded-tr-sm rounded-br-sm bg-white p-2.5 text-[#555] transition-all hover:shadow-md',
                {
                  'pointer-events-none bg-gray-200 p-2.5 text-gray-400': page === pageSize
                }
              )}
            >
              <ChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
