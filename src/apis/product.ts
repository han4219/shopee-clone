import { GetProductsConfig, Product, ProductList } from 'src/types/product.type'
import request from 'src/utils/http'
import endPoint from './endPoint'
import { ResponseSuccess } from 'src/types/utils.type'

const URL = endPoint.getProducts

const productApi = {
  getProducts(params: GetProductsConfig) {
    return request.get<ResponseSuccess<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return request.get<ResponseSuccess<Product>>(`URL/${id}`)
  }
}

export default productApi
