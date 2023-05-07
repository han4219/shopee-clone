const path = {
  home: '/',
  login: '/login',
  logout: '/logout',
  cart: '/cart',
  register: '/register',
  purchase: '/purchases',
  productDetail: '/:nameId',
  profile: 'profile',
  changePassword: 'change-password',
  purchaseOrder: 'purchase-order'
} as const

export default path
