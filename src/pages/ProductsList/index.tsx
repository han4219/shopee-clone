import React from 'react'
import Aside from './Aside'
import Sort from './Sort'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product'
import Pagination from 'src/components/Pagination'
import { GetProductsConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category'
import useQueryConfig from 'src/hooks/useQueryConfig'

const ProductsList: React.FC = () => {
  const queryConfig = useQueryConfig()

  const { data: getProductsResult } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as GetProductsConfig)
    },
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true
  })

  const { data: getCategoryResult } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <section className='bg-gray-200/80 py-6'>
      <div className='container grid grid-cols-12 gap-3 px-4'>
        {getCategoryResult && (
          <div className='col-span-3'>
            <Aside queryConfig={queryConfig} categories={getCategoryResult?.data.data} />
          </div>
        )}
        {getProductsResult && (
          <div className='col-span-9'>
            <Sort queryConfig={queryConfig} pageSize={getProductsResult.data.data.pagination.page_size} />
            <div className='my-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {getProductsResult.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <div>
              <Pagination queryConfig={queryConfig} pageSize={getProductsResult.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductsList
