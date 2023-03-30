import Login from './pages/Login'
import Products from './pages/Products'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'

const useRouteElements = () => {
  const protectedRoutes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Products />
        }
      ]
    },
    {
      path: '/',
      element: <RegisterLayout />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
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
