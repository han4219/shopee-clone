import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from './UserSidebar'

export default function UserLayout() {
  return (
    <div className='border-b-4 border-orange bg-bodyColor py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSidebar />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
