import React from 'react'
import { useLocation } from 'react-router-dom'
import path from 'src/constants/path'
import CartHeader from '../CartHeader'
import MainHeader from '../MainHeader'

const Header: React.FC = () => {
  const { pathname } = useLocation()
  const isCartPage = pathname === path.cart

  return isCartPage ? <CartHeader /> : <MainHeader />
}

export default Header
