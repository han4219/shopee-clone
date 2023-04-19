export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortBy {
  CREATED_AT = 'createdAt',
  VIEW = 'view',
  SOLD = 'sold',
  PRICE = 'price'
}

export type GetProductsConfig = {
  page?: number
  limit?: number
  order?: Order
  sort_by?: SortBy
  category?: string
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
