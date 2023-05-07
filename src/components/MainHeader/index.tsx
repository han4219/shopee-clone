import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth'
import purchaseApi from 'src/apis/purchase'
import { purchasesStatus } from 'src/constants/purchase'
import { AppAuthContext } from 'src/contexts/AuthContext'
import Popover from '../Popover'
import LanguageIcon from 'src/svgs/LanguageIcon'
import ChervonDown from 'src/svgs/ChervonDown'
import path from 'src/constants/path'
import Button from '../Button'
import LogoShopee from 'src/svgs/LogoShopee'
import Input from '../Input'
import Search from 'src/svgs/Search'
import { formatProductPrice } from 'src/utils/format'
import Cart from 'src/svgs/Cart'
import useSearchProducts from 'src/hooks/useSearchProducts'

export default function MainHeader() {
  const { user } = useContext(AppAuthContext)
  const { isAuthenticated, setIsAuthenticated } = useContext(AppAuthContext)
  const { handleSearch, register } = useSearchProducts()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout
  })

  const { data: purchaseData } = useQuery({
    queryKey: ['getPurchases', { status: purchasesStatus.IN_CART }],
    queryFn: () => purchaseApi.getPurchases(purchasesStatus.IN_CART),
    enabled: isAuthenticated
  })

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false)
      }
    })
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
      {/* End top header */}
      {/* Start search section */}
      <div className='mx-auto flex max-w-7xl items-end gap-10 px-4 pb-5 pt-5'>
        <div className='hidden w-40 text-white md:block'>
          <Link to='/'>
            <LogoShopee />
          </Link>
        </div>
        <div className='ml-4 max-w-4xl grow rounded-sm bg-white p-1'>
          <form className='flex justify-between gap-1 rounded-sm' onSubmit={handleSearch}>
            <Input
              register={register}
              name='searchName'
              className='w-full'
              classNameInput='w-full h-full indent-2 outline-1'
              placeholder='Đăng ký và nhận vourcher bạn mới đến 70k!'
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
            <div className='flex w-[350px] flex-col gap-4 rounded-sm bg-white text-sm shadow-md md:w-96'>
              <div className='w-full'>
                {purchaseData && isAuthenticated && purchaseData?.data.data.length > 0 ? (
                  <div>
                    <div className='px-4 pt-3'>
                      <p className='text-base text-black opacity-30'>Sản phẩm mới thêm</p>
                    </div>
                    {purchaseData.data.data.slice(0, 5).map((purchase) => (
                      <div key={purchase._id} className='flex px-4 py-3 transition-all hover:bg-gray-100'>
                        <div className='h-11 w-11 flex-shrink-0 border-[1px] border-gray-300'>
                          <img src={purchase.product.image} alt={purchase.product.name} className='object-cover' />
                        </div>
                        <div className='ml-2 overflow-hidden'>
                          <div className='truncate'>{purchase.product.name}</div>
                          <div className='flex-1'></div>
                        </div>
                        <div className='flex-shink-0'>
                          <span className='text-orange'>₫{formatProductPrice(purchase.product.price)}</span>
                        </div>
                      </div>
                    ))}
                    <div className='flex items-center justify-between px-4 pb-4'>
                      <div>
                        <span className='text-xs'>
                          {purchaseData && purchaseData.data.data.length > 5 ? purchaseData.data.data.length - 5 : ''}{' '}
                          Thêm Hàng Vào Giỏ
                        </span>
                      </div>
                      <Link
                        to='/cart'
                        className='rounded-sm bg-orange px-3 py-2 text-white shadow transition-all hover:opacity-80'
                      >
                        Xem giỏ hàng
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center justify-center py-5 font-semibold text-gray-500'>
                    Không có sản phẩm nào
                  </div>
                )}
              </div>
            </div>
          }
        >
          <Link to={path.cart}>
            <div className='relative cursor-pointer'>
              <Cart />
              {isAuthenticated && (
                <div
                  className='absolute -right-4 -top-3 flex items-center justify-center rounded-3xl border-[2px] border-orange bg-white px-2.5 py-[1px] text-sm
             text-orange'
                >
                  {purchaseData?.data.data.length}
                </div>
              )}
            </div>
          </Link>
        </Popover>
      </div>
      {/* End search section */}
    </div>
  )
}
