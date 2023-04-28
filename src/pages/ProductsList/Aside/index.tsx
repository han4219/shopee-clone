import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import CategoryIcon from 'src/svgs/CategoryIcon'
import FunnelIcon from 'src/svgs/FunnelIcon'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import InputNumber from 'src/components/InputNumber'
import { PriceData, priceSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { WithoutNullableKeys } from 'src/types/utils.type'
import RatingStarsFilter from 'src/components/RatingStarsFilter'
import { QueryConfig } from 'src/hooks/useQueryConfig'

type Props = {
  queryConfig: QueryConfig
  categories: Category[]
}

export default function Aside({ categories, queryConfig }: Props) {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<WithoutNullableKeys<PriceData>>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  const { category: categoryID } = queryConfig

  const handleOnSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleClearFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['price_max', 'price_min', 'rating_filter', 'category']
        )
      ).toString()
    })
  }

  return (
    <div className='w-4/5'>
      <div>
        <Link
          to={path.home}
          className={classNames('flex items-center justify-start pb-4', {
            'text-orange': !categoryID
          })}
        >
          <CategoryIcon />
          <span className='ml-2 text-base font-bold capitalize'>tất cả danh mục</span>
        </Link>
      </div>
      <div className='h-[1px] w-full bg-gray-300'></div>
      {/* list category */}
      <div className='py-4 pl-3'>
        <ul>
          {categories.map((category) => (
            <li className='py-1.5' key={category._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams(
                    omit(
                      {
                        ...queryConfig,
                        category: category._id
                      },
                      'page'
                    )
                  ).toString()
                }}
                className={classNames('text-sm capitalize transition-all hover:opacity-80', {
                  'font-bold text-orange': categoryID === category._id
                })}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* filter, search */}
      <div>
        <div>
          <div className='flex items-center justify-start py-6'>
            <FunnelIcon />
            <span className='ml-2 text-base font-bold uppercase'>bộ lọc tìm kiếm</span>
          </div>
        </div>
        <div>
          <p className='pb-4 text-sm capitalize'>khoảng giá</p>
          <form onSubmit={handleOnSubmit}>
            <div className='flex items-center justify-between gap-3'>
              <Controller
                control={control}
                name='price_min'
                render={({ field: { onChange, value, ref } }) => (
                  <InputNumber
                    onChange={(event) => {
                      onChange(event)
                      trigger('price_max')
                    }}
                    value={value}
                    ref={ref}
                    className='grow'
                    placeholder='₫ TỪ'
                    classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-sm outline-none focus:border-gray-400 focus:shadow-sm'
                  />
                )}
              />

              <div className='h-[1px] w-3 flex-shrink-0 bg-gray-400'></div>
              <Controller
                control={control}
                name='price_max'
                render={({ field: { onChange, value, ref } }) => (
                  <InputNumber
                    onChange={(event) => {
                      onChange(event)
                      trigger('price_min')
                    }}
                    value={value}
                    ref={ref}
                    className='grow'
                    placeholder='₫ ĐẾN'
                    classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-sm outline-none focus:border-gray-400 focus:shadow-sm'
                  />
                )}
              />
            </div>
            <div className='min-h-[1.5rem] text-center text-sm text-red-600'>
              {errors.price_min?.message || errors.price_max?.message}
            </div>
            <Button className='flex w-full items-center justify-center rounded-sm bg-orange py-2 uppercase text-white transition-all hover:shadow-md'>
              áp dụng
            </Button>
          </form>
        </div>
      </div>
      <div className='my-4 h-[1px] w-full bg-gray-300'></div>
      <div>
        <p className='pb-4 text-sm capitalize'>đánh giá</p>
        <div className='flex flex-col'>
          <RatingStarsFilter queryConfig={queryConfig} />
        </div>
      </div>
      <div className='my-4 h-[1px] w-full bg-gray-300'></div>
      <div>
        <Button
          onClick={handleClearFilter}
          className='flex w-full items-center justify-center rounded-sm bg-orange py-2 uppercase text-white transition-all hover:bg-orange/80'
        >
          xóa tất cả
        </Button>
      </div>
    </div>
  )
}
