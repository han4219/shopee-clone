import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { ResponseSuccess } from 'src/types/utils.type'
import request from 'src/utils/http'

const URL = path.purchase

const purchaseApi = {
  addToCart({ product_id, buy_count }: { product_id: string; buy_count: number }) {
    return request.post<ResponseSuccess<Purchase>>(`${URL}/add-to-cart`, { product_id, buy_count })
  },
  getPurchases(status: purchasesStatus) {
    return request.get<ResponseSuccess<Purchase[]>>(`${URL}`, {
      params: { status }
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }) {
    return request.post<ResponseSuccess<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchases(body: { product_id: string; buy_count: number }) {
    return request.post<ResponseSuccess<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return request.delete<ResponseSuccess<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
