import Login from './pages/Login'
import Products from './pages/ProductsList'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppAuthContext } from './contexts/AuthContext'
import ProductDetail from './pages/ProductDetail'
import path from './constants/path'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppAuthContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppAuthContext)
  return isAuthenticated ? <Navigate to='/' /> : <Outlet />
}

const useRouteElements = () => {
  const protectedRoutes = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: 'profile',
              element: <Profile />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: '',
          element: <Products />
        },
        {
          path: path.productDetail,
          element: <ProductDetail />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return protectedRoutes
}

export default useRouteElements
