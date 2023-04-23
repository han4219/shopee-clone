import request from 'src/utils/http'
import endPoint from './endPoint'
import { ResponseSuccess } from 'src/types/utils.type'
import { Category } from 'src/types/category.type'

const URL = endPoint.getCategories

const categoryApi = {
  getCategories() {
    return request.get<ResponseSuccess<Category[]>>(URL)
  }
}

export default categoryApi
