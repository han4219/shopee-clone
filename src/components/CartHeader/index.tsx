import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import Search from 'src/svgs/Search'
import Input from '../Input'
import LogoShopee from 'src/svgs/LogoShopee'
import Popover from '../Popover'
import ChervonDown from 'src/svgs/ChervonDown'
import LanguageIcon from 'src/svgs/LanguageIcon'
import Button from '../Button'
import { AppAuthContext } from 'src/contexts/AuthContext'
import useSearchProducts from 'src/hooks/useSearchProducts'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth'

export default function CartHeader() {
  const { user } = useContext(AppAuthContext)
  const { isAuthenticated, setIsAuthenticated } = useContext(AppAuthContext)
  const { handleSearch, register } = useSearchProducts()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout
  })

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false)
      }
    })
  }

  return (
    <div>
      <div className='bg-orange py-2'>
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
                offsetCrossAxis={-10}
                content={
                  <div className='flex flex-col rounded-sm bg-white shadow-md'>
                    <Link
                      className='px-5 py-3 text-sm transition-all hover:bg-gray-100 hover:text-cyan'
                      to={'/user/' + path.profile}
                    >
                      Tài khoản của tôi
                    </Link>
                    <Link
                      className='px-5 py-3 text-sm transition-all hover:bg-gray-100 hover:text-cyan'
                      to={'/user/' + path.purchaseOrder}
                    >
                      Đơn mua
                    </Link>
                    <Button
                      loading={logoutMutation.isLoading}
                      className='flex items-center justify-start px-5 py-3 text-left text-sm transition-all hover:bg-gray-100 hover:text-cyan'
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Button>
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
                    <p>{user?.email}</p>
                  </div>
                </div>
              </Popover>
            )}
            {!isAuthenticated && (
              <div className='ml-5 flex items-center justify-between gap-2'>
                <Link to={path.register} className='hover:text-gray-300'>
                  Đăng ký
                </Link>
                <span className='h-4 w-[1px] bg-gray-300 opacity-30'></span>
                <Link to={path.login} className='hover:text-gray-300'>
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mx-auto flex max-w-7xl flex-col items-end justify-between gap-10 px-7 pb-5 pt-5 sm:flex-row'>
        <div className='mx-auto text-white sm:mx-0'>
          <Link to='/'>
            <div className='flex items-center'>
              <div className='w-40'>
                <LogoShopee fill='#ee4d2d' />
              </div>
              <div className='mx-4 h-7 w-[1px] bg-orange'></div>
              <div className='mt-2 text-2xl capitalize text-orange'>giỏ hàng</div>
            </div>
          </Link>
        </div>
        <div className='w-full rounded-sm bg-white sm:basis-1/3'>
          <form className='flex justify-between gap-1 rounded-sm border-2 border-orange' onSubmit={handleSearch}>
            <Input
              register={register}
              name='searchName'
              className='w-full'
              classNameInput='w-full h-full indent-2 focus:outline-none'
              classNameError='hidden'
              placeholder={`${new Date().getDay()}.${new Date().getMonth()}`}
            />
            <button type='submit' className='bg-orange px-5 py-2 transition-all hover:opacity-90'>
              <Search />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
