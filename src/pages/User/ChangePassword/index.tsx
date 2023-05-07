import React from 'react'
import Input from 'src/components/Input'

export default function ChangePassword() {
  return (
    <div className='rounded-sm bg-white px-10 py-8 shadow'>
      <div className='border-b border-b-gray-200 pb-4'>
        <div className='text text-xl capitalize'>đổi mật khẩu</div>
        <div className='text-gray-500'>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
      </div>
      <div className='mt-5 flex flex-col justify-center'>
        <div className='w-full md:w-[80%]'>
          <div className='flex flex-col justify-start md:flex-row md:items-center'>
            <div className='basis-1/4'>
              <div className='text-left text-gray-500 md:pr-4 md:text-right'>Mật khẩu mới</div>
            </div>
            <div className='basis-3/4'>
              <Input
                type='password'
                classNameError='hidden'
                classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
              />
            </div>
          </div>
        </div>

        <div className='mt-4 w-full md:w-[80%]'>
          <div className='flex flex-col justify-start md:flex-row md:items-center'>
            <div className='basis-1/4'>
              <div className='text-left text-gray-500 md:pr-4 md:text-right'>Xác nhận mật khẩu</div>
            </div>
            <div className='basis-3/4'>
              <Input
                type='password'
                classNameError='hidden'
                classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
              />
            </div>
          </div>
        </div>

        <div className='mt-4 w-full md:w-[80%]'>
          <div className='flex flex-col justify-start md:flex-row md:items-center'>
            <div className='basis-1/4'></div>
            <div className='basis-3/4'>
              <button className='rounded-sm bg-orange px-4 py-2 text-white transition-colors hover:bg-orange/80'>
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
