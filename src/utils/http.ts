import { toast } from 'react-toastify'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'Application/json',
        'Cache-Control': 'no-cache'
      }
    })

    this.instance.interceptors.request.use(
      function (config) {
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error: AxiosError) {
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
