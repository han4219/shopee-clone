import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from 'src/svgs/Logo'

const RegisterHeader = () => {
  const location = useLocation()
  const isRegisterPage = location.pathname === '/register'

  return (
    <header className='h-20 w-full'>
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4'>
        <nav className='flex items-end gap-3'>
          <Link to={'/'}>
            <Logo />
          </Link>
          <span className='text-lg font-medium md:text-2xl'>{isRegisterPage ? 'Đăng ký' : 'Đăng nhập'}</span>
        </nav>
        <div className=''>
          <span className='cursor-pointer text-base text-orange'>Bạn cần giúp đỡ?</span>
        </div>
      </div>
    </header>
  )
}

export default RegisterHeader
