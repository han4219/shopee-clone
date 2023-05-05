import path from 'src/constants/path'
import { Purchase } from 'src/types/purchase.type'
import { ResponseSuccess } from 'src/types/utils.type'
import request from 'src/utils/http'

const URL = path.purchase

const purchaseApi = {
  addToCart({ product_id, buy_count }: { product_id: string; buy_count: number }) {
    return request.post<ResponseSuccess<Purchase>>(`${URL}/add-to-cart`, { product_id, buy_count })
  },
  getPurchases(status: string) {
    return request.get<ResponseSuccess<Purchase[]>>(`${URL}?status=${status}`)
  }
}

export default purchaseApi
