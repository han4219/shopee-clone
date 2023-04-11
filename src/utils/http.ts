import { toast } from 'react-toastify'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { clearAccessTokenFromLS, getAccessTokenFromLS, setAccessTokenToLS } from './auth'
import { AuthResponse } from 'src/types/auth.type'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'Application/json',
        'Cache-Control': 'no-cache'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const url = response.config.url
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data.access_token
          setAccessTokenToLS(this.accessToken)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccessTokenFromLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any = error.response?.data
          const message = data.message || error.message
          toast.error(message, {
            position: 'top-center'
          })
        }
        return Promise.reject(error)
      }
    )
  }
}

const request = new Http().instance

export default request
