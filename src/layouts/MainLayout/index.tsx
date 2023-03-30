import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <div>
      MainLayout
      <Outlet />
    </div>
  )
}

export default MainLayout
