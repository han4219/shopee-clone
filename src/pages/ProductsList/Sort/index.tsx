import React from 'react'
import Button from 'src/components/Button'
import ChevronLeft from 'src/svgs/ChevronLeft'
import ChevronRight from 'src/svgs/ChevronRight'

export default function Sort() {
  return (
    <div className='rounded-sm bg-gray-200 shadow'>
      <div className='flex flex-wrap items-center justify-between px-4 text-sm font-light'>
        <div className='flex items-center gap-3 py-3'>
          <p>Sắp xếp theo</p>
          <Button className='rounded-sm bg-orange px-2 py-1.5 transition-all hover:opacity-80'>
            <span className='w-full capitalize text-white'>phổ biến</span>
          </Button>
          <Button className='rounded-sm bg-white  px-2 py-1.5   transition-all hover:opacity-80'>
            <span className='w-full capitalize text-black'>mới nhất</span>
          </Button>
          <Button className='rounded-sm  bg-white px-2 py-1.5 transition-all hover:opacity-80'>
            <span className='w-full capitalize text-black'>bán chạy</span>
          </Button>
          <select defaultValue='price' className='w-44 rounded-sm bg-white py-2 text-left outline-none'>
            <option value='price' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến Cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center gap-3 py-3'>
          <p>
            <span className='text-orange'>1</span>/<span>9</span>
          </p>
          <div className='flex items-center'>
            <button className='cursor-auto rounded-tl-sm rounded-bl-sm bg-gray-100 p-2.5 text-[#ccc] transition-all'>
              <ChevronLeft />
            </button>
            <div className='w-[1px]'></div>
            <button className='rounded-tr-sm rounded-br-sm bg-white p-2.5 text-[#555] transition-all hover:shadow-md'>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
