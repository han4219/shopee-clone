import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cart from 'src/svgs/Cart'
import ChervonDown from 'src/svgs/ChervonDown'
import LanguageIcon from 'src/svgs/LanguageIcon'
import LogoShopee from 'src/svgs/LogoShopee'
import Search from 'src/svgs/Search'
import Popover from '../Popover'
import { AppAuthContext } from 'src/contexts/AuthContext'
import { clearAccessTokenFromLS } from 'src/utils/auth'

const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppAuthContext)

  const handleLogout = () => {
    clearAccessTokenFromLS()
    setIsAuthenticated(false)
  }
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
          <Popover
            type='div'
            offsetCrossAxis={-40}
            className='flex cursor-pointer items-center gap-1 hover:text-gray-200'
            content={
              <div className='cursor-pointer rounded-sm bg-white py-3 pl-5 pr-28 text-gray-800 shadow-md'>
                <div className='flex flex-col gap-4'>
                  <span className='text-sm hover:text-orange'>Tiếng Việt</span>
                  <span className='text-sm hover:text-orange'>English</span>
                </div>
              </div>
            }
          >
            <LanguageIcon />
            <span>Tiếng Việt</span>
            <ChervonDown />
          </Popover>

          {isAuthenticated && (
            <Popover
              type='div'
              className='cursor-pointe ml-3'
              offsetCrossAxis={-30}
              content={
                <div className='flex flex-col rounded-sm bg-white shadow-md'>
                  <Link
                    className='px-5 py-3 text-sm transition-all hover:bg-gray-100 hover:text-cyan'
                    to='/user/account/profile'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    className='px-5 py-3 text-sm transition-all hover:bg-gray-100 hover:text-cyan'
                    to='/user/purchase'
                  >
                    Đơn mua
                  </Link>
                  <button
                    className='px-5 py-3 text-left text-sm transition-all hover:bg-gray-100 hover:text-cyan'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='flex cursor-pointer items-center gap-2'>
                <div>
                  <img
                    src='https://images2.thanhnien.vn/Uploaded/gianglao/2022_04_07/benzema-afp-1371.jpeg'
                    className='h-5 w-5 rounded-full'
                    alt=''
                  />
                </div>
                <div>
                  <p>hoangan42</p>
                </div>
              </div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className='ml-5 flex items-center justify-between gap-2'>
              <Link to='/register' className='hover:text-gray-300'>
                Đăng ký
              </Link>
              <span className='h-4 w-[1px] bg-gray-300 opacity-30'></span>
              <Link to='/login' className='hover:text-gray-300'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* End top header */}
      {/* Start search section */}
      <div className='mx-auto flex max-w-7xl items-end gap-10 px-4 pb-5 pt-2'>
        <div className='hidden w-40 text-white md:block'>
          <Link to='/'>
            <LogoShopee />
          </Link>
        </div>
        <div className='ml-4 max-w-4xl grow rounded-sm bg-white p-1'>
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
        <Popover
          type='div'
          offsetCrossAxis={-150}
          className='ml-5'
          content={
            <div className='flex w-96 flex-col gap-4 rounded-sm bg-white text-sm shadow-md'>
              <div className='px-4 pt-3'>
                <p className='text-base text-black opacity-30'>Sản phẩm mới thêm</p>
              </div>
              <div className='w-full'>
                {/* Item */}
                <div className='flex w-full cursor-pointer items-start justify-between px-4 py-3 transition-all hover:bg-gray-100'>
                  <div className='h-10 w-10 border-[1px] border-gray-300 bg-[url("https://down-vn.img.susercontent.com/file/sg-11134201-23010-rodv979ytxlv5c_tn")] bg-cover bg-no-repeat'></div>
                  <div className='flex items-center justify-between'>
                    <div className='max-w-[205px] overflow-hidden text-ellipsis whitespace-nowrap'>
                      Loa Soundbar Bluetooth Âm Thanh Vòm 8D BASS BOSEBT-D01 Super Bass 2023 Cho Tivi Máy Tính Laptop PC
                      Điện Thoại
                    </div>
                    <div className='flex-1'></div>
                    <div className='ml-10'>
                      <span className='text-orange'>₫569.000</span>
                    </div>
                  </div>
                </div>
                {/* Item */}
                <div className='flex w-full cursor-pointer items-start justify-between px-4 py-3 transition-all hover:bg-gray-100'>
                  <div className='h-10 w-10 border-[1px] border-gray-300 bg-[url("https://down-vn.img.susercontent.com/file/sg-11134201-23010-rodv979ytxlv5c_tn")] bg-cover bg-no-repeat'></div>
                  <div className='flex items-center justify-between'>
                    <div className='max-w-[205px] overflow-hidden text-ellipsis whitespace-nowrap'>
                      Loa Soundbar Bluetooth Âm Thanh Vòm 8D BASS BOSEBT-D01 Super Bass 2023 Cho Tivi Máy Tính Laptop PC
                      Điện Thoại
                    </div>
                    <div className='flex-1'></div>
                    <div className='ml-10'>
                      <span className='text-orange'>₫569.000</span>
                    </div>
                  </div>
                </div>
                {/* Item */}
                <div className='flex w-full cursor-pointer items-start justify-between px-4 py-3 transition-all hover:bg-gray-100'>
                  <div className='h-10 w-10 border-[1px] border-gray-300 bg-[url("https://down-vn.img.susercontent.com/file/sg-11134201-23010-rodv979ytxlv5c_tn")] bg-cover bg-no-repeat'></div>
                  <div className='flex items-center justify-between'>
                    <div className='max-w-[205px] overflow-hidden text-ellipsis whitespace-nowrap'>
                      Loa Soundbar Bluetooth Âm Thanh Vòm 8D BASS BOSEBT-D01 Super Bass 2023 Cho Tivi Máy Tính Laptop PC
                      Điện Thoại
                    </div>
                    <div className='flex-1'></div>
                    <div className='ml-10'>
                      <span className='text-orange'>₫569.000</span>
                    </div>
                  </div>
                </div>
                {/* Item */}
                <div className='flex w-full cursor-pointer items-start justify-between px-4 py-3 transition-all hover:bg-gray-100'>
                  <div className='h-10 w-10 border-[1px] border-gray-300 bg-[url("https://down-vn.img.susercontent.com/file/sg-11134201-23010-rodv979ytxlv5c_tn")] bg-cover bg-no-repeat'></div>
                  <div className='flex items-center justify-between'>
                    <div className='max-w-[205px] overflow-hidden text-ellipsis whitespace-nowrap'>
                      Loa Soundbar Bluetooth Âm Thanh Vòm 8D BASS BOSEBT-D01 Super Bass 2023 Cho Tivi Máy Tính Laptop PC
                      Điện Thoại
                    </div>
                    <div className='flex-1'></div>
                    <div className='ml-10'>
                      <span className='text-orange'>₫569.000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between px-4 pb-4'>
                <div>
                  <span className='text-xs'>1 Thêm Hàng Vào Giỏ</span>
                </div>
                <Link
                  to='/cart'
                  className='rounded-sm bg-orange px-3 py-2 text-white shadow transition-all hover:opacity-80'
                >
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
          }
        >
          <div className='relative'>
            <div
              className='absolute -right-4 -top-3 flex items-center justify-center rounded-3xl border-[2px] border-orange bg-white px-2.5 py-[1px] text-sm
             text-orange'
            >
              6
            </div>
            <Link to='/cart'>
              <Cart />
            </Link>
          </div>
        </Popover>
      </div>
      {/* End search section */}
    </div>
  )
}

export default Header