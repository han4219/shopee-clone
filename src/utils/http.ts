import axios, { AxiosInstance } from 'axios'

class Http {
  public instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'Application/json',
        'Cache-Control': 'no-cache'
      }
    })
  }
}

const request = new Http()

export default request
