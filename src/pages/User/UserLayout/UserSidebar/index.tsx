import classNames from 'classnames'
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { AppAuthContext } from 'src/contexts/AuthContext'
import { getAvatarURL } from 'src/utils/utils'

export default function UserSidebar() {
  const { user } = useContext(AppAuthContext)

  return (
    <div className='flex flex-col py-4'>
      <div className='flex items-center gap-4 border-b-[2px] border-b-gray-200 pb-8'>
        <Link to={'/user/' + path.profile} className='h-10 w-10 overflow-hidden rounded-full'>
          <img
            src={
              user?.avatar
                ? getAvatarURL(user.avatar)
                : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
            }
            alt='avatar'
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex flex-col justify-center'>
          <b className='truncate'>{user?.name || user?.email}</b>
          <Link to={'/user/' + path.profile} className='flex items-center gap-1 font-semibold capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            sửa hồ sơ
          </Link>
        </div>
      </div>

      <div className='mt-4 flex flex-col gap-5'>
        <div className=''>
          <NavLink
            to={'/user/' + path.profile}
            className={({ isActive }) =>
              classNames('flex items-center gap-3 capitalize', {
                'font-bold text-orange': isActive
              })
            }
          >
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='h-5 w-5'
            />
            tài khoản của tôi
          </NavLink>
        </div>

        <div>
          <NavLink
            to={'/user/' + path.changePassword}
            className={({ isActive }) =>
              classNames('flex items-end gap-3 capitalize', {
                'font-bold text-orange': isActive
              })
            }
          >
            <svg width={24} height={24} fill='none' className='-ml-[2px]'>
              <path
                fillRule='evenodd'
                clipRule='#105ab6'
                d='M7.757 9.376c.002.212.005.42.005.624h-.75 9.226c0-.204.003-.412.005-.624.015-1.184.03-2.465-.39-3.54-.234-.6-.595-1.1-1.161-1.46-.574-.365-1.42-.626-2.692-.626-1.271 0-2.119.26-2.692.625-.566.36-.927.86-1.161 1.46-.42 1.077-.405 2.357-.39 3.541zm-1.501.083c.003.195.006.376.006.541H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-.262c0-.165.003-.346.006-.54.018-1.166.044-2.793-.494-4.17-.327-.838-.87-1.619-1.753-2.18-.877-.558-2.025-.86-3.497-.86s-2.62.302-3.497.86c-.883.56-1.426 1.341-1.753 2.18-.538 1.377-.512 3.005-.494 4.17zM18 11.5H6a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h12a.5.5 0 00.5-.5v-8a.5.5 0 00-.5-.5zM12 14a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1z'
                fill='red'
              />
            </svg>
            đổi mật khẩu
          </NavLink>
        </div>
        <div>
          <NavLink
            to={'/user/' + path.purchaseOrder}
            className={({ isActive }) =>
              classNames('flex items-end gap-3 capitalize', {
                'font-bold text-orange': isActive
              })
            }
          >
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              alt=''
              className='h-5 w-5'
            />
            đơn mua
          </NavLink>
        </div>
      </div>
    </div>
  )
}
