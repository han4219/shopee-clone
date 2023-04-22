import React from 'react'
import Aside from './Aside'
import Sort from './Sort'
import Product from './Product'
import { omitBy, isUndefined } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/apis/product'
import Pagination from 'src/components/Pagination'
import { GetProductsConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof GetProductsConfig]: string
}

const ProductsList: React.FC = () => {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as GetProductsConfig)
    },
    keepPreviousData: true,
    staleTime: 5000
  })

  return (
    <section className='bg-gray-200/80 py-6'>
      <div className='container grid grid-cols-12 gap-3 px-4'>
        <div className='col-span-3'>
          <Aside />
        </div>
        {data && (
          <div className='col-span-9'>
            <Sort queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            <div className='my-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductsList
