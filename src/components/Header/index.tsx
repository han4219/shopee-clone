import React from 'react'
import { Link } from 'react-router-dom'
import Cart from 'src/svgs/Cart'
import ChervonDown from 'src/svgs/ChervonDown'
import LanguageIcon from 'src/svgs/LanguageIcon'
import LogoShopee from 'src/svgs/LogoShopee'
import Search from 'src/svgs/Search'

const Header: React.FC = () => {
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      {/* Start top header */}
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between px-4 pt-1 md:flex-row'>
        <div className='flex items-center justify-between gap-1 text-sm text-white md:gap-2'>
          <Link to='/' className='text-center hover:text-gray-200'>
            Kênh người bán
          </Link>
          <span className='h-4 w-[2px] bg-gray-300 opacity-30'></span>
          <Link to='/' className='text-center hover:text-gray-200'>
            Trở thành Người bán Shopee
          </Link>
          <span className='h-4 w-[2px] bg-gray-300 opacity-30'></span>
          <Link to='/' className='text-center hover:text-gray-200'>
            Tải ứng dụng
          </Link>
          <span className='h-4 w-[2px] bg-gray-300 opacity-30'></span>
          <Link to='/' className='text-center hover:text-gray-200'>
            Kết nối
          </Link>
        </div>
        <div className='mt-2 flex items-center justify-between text-sm text-white md:mt-0'>
          <div className='flex cursor-pointer items-center gap-1 hover:text-gray-300'>
            <LanguageIcon />
            <span>Tiếng Việt</span>
            <ChervonDown />
          </div>
          <div className='ml-5 flex items-center justify-between gap-2'>
            <Link to='/register' className='hover:text-gray-300'>
              Đăng ký
            </Link>
            <span className='h-4 w-[1px] bg-gray-300 opacity-30'></span>
            <Link to='/login' className='hover:text-gray-300'>
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
      {/* End top header */}
      {/* Start search section */}
      <div className='mx-auto flex max-w-7xl items-end justify-between px-4 py-6'>
        <div className='hidden w-40 text-white md:block'>
          <LogoShopee />
        </div>
        <div className='mx-2 max-w-3xl grow rounded-sm bg-white p-1'>
          <form className='flex justify-between gap-1 rounded'>
            <input
              type='text'
              className='w-full indent-2 outline-1'
              placeholder='Đăng ký và nhận voucher bạn mới đến 70k!'
            />
            <button type='submit' className='rounded-sm bg-orange px-5 py-2 transition-all hover:opacity-90'>
              <Search />
            </button>
          </form>
        </div>
        <div className='cursor-pointer'>
          <Cart />
        </div>
      </div>
      {/* End search section */}
    </div>
  )
}

export default Header
