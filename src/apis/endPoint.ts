const endPoint = {
  me: '/me',
  login: '/login',
  logout: '/logout',
  updateMe: '/user',
  register: '/register',
  getProducts: '/products',
  getPurchases: '/purchases',
  getCategories: '/categories',
  getProductDetail: '/products',
  deletePurchases: '/purchases',
  uploadAvatar: '/user/upload-avatar',
  addToCart: '/purchases/add-to-cart',
  refreshToken: '/refresh-access-token',
  buyPurchases: '/purchases/buy-products',
  updatePurchase: '/purchases/update-purchase'
} as const

export default endPoint
