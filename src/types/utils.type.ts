export interface ResponseApi<Data> {
  message: string
  data?: Data
}

export interface ResponseError {
  message: string
  data?: any
}
