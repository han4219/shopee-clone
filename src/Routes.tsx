import Login from './pages/Login'
import Products from './pages/ProductsList'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import { useContext } from 'react'
import { AppAuthContext } from './contexts/AuthContext'
import ProductDetail from './pages/ProductDetail'
import path from './constants/path'
import Cart from './pages/Cart'
import Profile from './pages/User/Profile'
import ChangePassword from './pages/User/ChangePassword'
import PurchaseOrder from './pages/User/PurchaseOrder'
import UserLayout from './pages/User/UserLayout'

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
          element: <MainLayout />,
          children: [
            {
              path: path.cart,
              element: <Cart />
            },
            {
              path: 'user',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: <Profile />
                },
                {
                  path: path.changePassword,
                  element: <ChangePassword />
                },
                {
                  path: path.purchaseOrder,
                  element: <PurchaseOrder />
                }
              ]
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
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
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
