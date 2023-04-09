import React from 'react'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

const RegisterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <RegisterHeader />
      <div className='mx-auto bg-bgContentRegister'>{children}</div>
      <Footer />
    </div>
  )
}

export default RegisterLayout
