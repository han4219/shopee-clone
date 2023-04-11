export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token')
}

export const setAccessTokenToLS = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenFromLS = () => {
  return localStorage.removeItem('access_token')
}
