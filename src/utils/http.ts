import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      headers: {
        'Content-Type': 'Application/json',
        'Cache-Control': 'no-cache'
      }
    })
  }
}

const request = new Http().instance

export default request
