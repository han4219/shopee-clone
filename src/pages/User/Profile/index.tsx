import React from 'react'
import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-10 py-4 shadow'>
      <div className='border-b border-b-gray-200 pb-4'>
        <div className='text text-xl capitalize'>hồ sơ của tôi</div>
        <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='flex flex-col-reverse py-4 md:flex-row'>
        <form className='w-full'>
          <div className='flex-grow md:pr-10'>
            <div className='flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Tên</div>
              </div>
              <div className='basis-4/5 md:w-full'>
                <Input
                  classNameError='hidden'
                  classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
                />
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Email</div>
              </div>
              <div className='basis-4/5 md:w-full'>
                <div>han@gmail.com</div>
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Số điện thoại</div>
              </div>
              <div className='basis-4/5 md:w-full'>
                <Input
                  classNameError='hidden'
                  classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
                />
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Địa chỉ</div>
              </div>
              <div className='basis-4/5 md:w-full'>
                <div>1 Ngõ 132/53, Nguyên Xá, Minh Khai</div>
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Ngày sinh</div>
              </div>
              <div className='flex basis-4/5 justify-between md:w-full'>
                <select className='w-[30%] rounded-sm border border-gray-400 px-4 py-2'>
                  <option value='ngày'>Ngày</option>
                </select>
                <select className='w-[30%] rounded-sm border border-gray-400 px-4 py-2'>
                  <option value='tháng'>Tháng</option>
                </select>
                <select className='w-[30%] rounded-sm border border-gray-400 px-4 py-2'>
                  <option value='năm'>Năm</option>
                </select>
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'></div>
              <div className='basis-4/5 md:w-full'>
                <button
                  type='submit'
                  className='rounded-sm bg-orange px-6 py-2 text-white transition-colors hover:bg-orange/80'
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className='md:w-72 md:border-l md:border-l-gray-200 md:px-10'>
          <div className='flex w-full flex-col items-center'>
            <div className='h-20 w-20 overflow-hidden rounded-full'>
              <img
                className='h-full w-full object-cover'
                src='https://down-vn.img.susercontent.com/file/bffa3c30229ce7373dd9b114d9ac74a9_tn'
                alt=''
              />
            </div>
            <input type='file' accept='.jpg,.jpeg,.png' className='hidden' />
            <button className='my-4 rounded-sm border bg-none px-4 py-2'>Chọn Ảnh</button>
            <div className='text-xs text-gray-500'>Dung lượng file tối đa 1 MB</div>
            <div className='text-xs text-gray-500'>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
      </div>
    </div>
  )
}
