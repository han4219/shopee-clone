import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'src/svgs/Logo'

const RegisterHeader = () => {
  return (
    <header className='h-20 w-full px-4'>
      <div className='m-auto flex h-full max-w-7xl items-center justify-between'>
        <nav className='flex items-end gap-3'>
          <Link to={'/'}>
            <Logo />
          </Link>
          <span className='text-lg font-medium md:text-2xl'>Đăng nhập</span>
        </nav>
        <div className=''>
          <span className='cursor-pointer text-base text-orange'>Bạn cần giúp đỡ?</span>
        </div>
      </div>
    </header>
  )
}

export default RegisterHeader
