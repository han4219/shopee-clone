import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import { useContext, lazy, Suspense } from 'react'
import { AppAuthContext } from './contexts/AuthContext'
import path from './constants/path'

const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Products = lazy(() => import('./pages/ProductsList'))
const Profile = lazy(() => import('./pages/User/Profile'))
const ChangePassword = lazy(() => import('./pages/User/ChangePassword'))
const PurchaseOrder = lazy(() => import('./pages/User/PurchaseOrder'))
const UserLayout = lazy(() => import('./pages/User/UserLayout'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

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
              element: (
                <Suspense>
                  <Cart />
                </Suspense>
              )
            },
            {
              path: 'user',
              element: (
                <Suspense>
                  <UserLayout />
                </Suspense>
              ),
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: path.purchaseOrder,
                  element: (
                    <Suspense>
                      <PurchaseOrder />
                    </Suspense>
                  )
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
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
          element: (
            <Suspense>
              <Products />
            </Suspense>
          )
        },
        {
          path: path.productDetail,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    }
  ])

  return protectedRoutes
}

export default useRouteElements
