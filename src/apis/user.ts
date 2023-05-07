import { User } from 'src/types/user.type'
import { ResponseSuccess } from 'src/types/utils.type'
import request from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

const userApi = {
  getProfile() {
    return request.get<ResponseSuccess<User>>('/me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return request.put<ResponseSuccess<User>>('/user', body)
  },
  uploadAvatar(body: FormData) {
    return request.post<ResponseSuccess<string>>('/user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
