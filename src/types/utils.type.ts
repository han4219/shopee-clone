export interface ResponseSuccess<Data> {
  message: string
  data: Data
}

export interface ResponseError<Data> {
  message: string
  data?: Data
}

export type WithoutNullableKeys<T> = {
  [K in keyof T]-?: WithoutNullableKeys<NonNullable<T[K]>>
}
