import React, { useState } from 'react'
import Aside from './Aside'
import Sort from './Sort'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/apis/product'
import Pagination from 'src/components/Pagination'

const ProductsList: React.FC = () => {
  const [page, setPage] = useState<number>(1)

  const searchParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', searchParams],
    queryFn: () => {
      return productApi.getProducts(searchParams)
    }
  })

  return (
    <section className='bg-gray-200/80 py-6'>
      <div className='container grid grid-cols-12 gap-3 px-4'>
        <div className='col-span-3'>
          <Aside />
        </div>
        <div className='col-span-9'>
          <Sort />
          <div className='my-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {data &&
              data.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
          </div>
          <div>
            <Pagination page={page} setPage={setPage} pageSize={20} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsList
