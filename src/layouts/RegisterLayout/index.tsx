import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

const RegisterLayout: React.FC = () => {
  return (
    <div>
      <RegisterHeader />
      <div className='mx-auto bg-bgContentRegister'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RegisterLayout
