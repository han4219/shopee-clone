import Login from './pages/Login'
import Products from './pages/Products'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import ProductDetail from './pages/ProductDetail'

const useRouteElements = () => {
  const protectedRoutes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Products />
        },
        {
          path: 'products/:Id',
          element: <ProductDetail />
        }
      ]
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return protectedRoutes
}

export default useRouteElements
