import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section className='bg-contain'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          <div className='col-span-1 py-24 md:col-span-3 md:col-start-2'>
            <form className='rounded-sm bg-white px-8 py-6 shadow-md'>
              <div>
                <p className='text-xl font-medium'>Đăng nhập</p>
              </div>
              <div className='mt-5'>
                <input
                  className='mt-2 w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
                  type='email'
                  name='email'
                  placeholder='Email'
                />
              </div>
              <div className='my-2 min-h-[1.5rem] pl-2 text-sm text-red-600'></div>
              <div>
                <input
                  className='w-full rounded-sm border border-gray-300 px-4 py-2 text-base outline-none focus:border-gray-400 focus:shadow-sm'
                  type='password'
                  name='password'
                  placeholder='Mật khẩu'
                />
              </div>
              <div className='my-2 min-h-[1.5rem] pl-2 text-sm text-red-600'></div>
              <button
                className='w-full rounded-sm bg-orange py-2 text-lg font-normal uppercase text-white hover:shadow-md'
                type='submit'
              >
                Đăng nhập
              </button>
              <div className='mt-5 flex justify-center'>
                <span className='pr-1 text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='text-orange' to={'/register'}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
