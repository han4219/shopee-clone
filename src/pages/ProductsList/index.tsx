import React from 'react'
import Aside from './Aside'
import Sort from './Sort'
import Product from './Product'

const ProductsList = () => {
  return (
    <section className='bg-gray-200/80 py-6'>
      <div className='container grid grid-cols-12 gap-3 px-4'>
        <div className='col-span-3'>
          <Aside />
        </div>
        <div className='col-span-9'>
          <Sort />
          <div className='my-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {Array(30)
              .fill(0)
              .map((_, index) => (
                <div className='col-span-1' key={index}>
                  <Product />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsList
