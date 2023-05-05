import { Product } from './product.type'

export interface Purchase {
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  _id: string
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
