export interface ResponseSuccess<Data> {
  message: string
  data: Data
}

export interface ResponseError<Data> {
  message: string
  data?: Data
}
