import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc.')
    .email('Email không đúng định dạng.')
    .min(5, 'Độ dài từ 5 - 160 ký tự.')
    .max(160, 'Độ dài từ 5 - 160 ký tự.'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc.')
    .min(6, 'Độ dài từ 6 - 160 ký tự.')
    .max(160, 'Độ dài từ 6 - 160 ký tự.'),
  confirm_password: yup
    .string()
    .required('Mật khẩu là bắt buộc.')
    .min(6, 'Độ dài từ 6 - 160 ký tự.')
    .max(160, 'Độ dài từ 6 - 160 ký tự.')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp.'),
  price_min: yup.string().test({
    name: 'invalid-price',
    message: 'Giá không hợp lệ',
    test(value) {
      const price_max = this.parent.price_max
      if (value && price_max) {
        return Number(price_max) >= Number(value)
      }
      return value !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'invalid-price',
    message: 'Giá không hợp lệ',
    test(value) {
      const price_min = this.parent.price_min
      if (value && price_min) {
        return Number(value) >= Number(price_min)
      }
      return value !== '' || price_min !== ''
    }
  }),
  searchName: yup.string().trim().required()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự.'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự.'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự.'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự.'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc.')
    .min(6, 'Độ dài từ 6 - 160 ký tự.')
    .max(160, 'Độ dài từ 6 - 160 ký tự.'),
  new_password: yup
    .string()
    .required('Mật khẩu mới là bắt buộc.')
    .min(6, 'Độ dài từ 6 - 160 ký tự.')
    .max(160, 'Độ dài từ 6 - 160 ký tự.'),
  confirm_new_password: yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc.')
    .min(6, 'Độ dài từ 6 - 160 ký tự.')
    .max(160, 'Độ dài từ 6 - 160 ký tự.')
    .oneOf([yup.ref('new_password')], 'Nhập lại mật khẩu không khớp.')
})

export const loginSchema = schema.pick(['email', 'password'])
export const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export const priceSchema = schema.pick(['price_min', 'price_max'])
export const searchSchema = schema.pick(['searchName'])

export type UserSchema = yup.InferType<typeof userSchema>
export type RegisterFormData = yup.InferType<typeof registerSchema>
export type LoginFormData = yup.InferType<typeof loginSchema>
export type PriceData = yup.InferType<typeof priceSchema>
export type SearchData = yup.InferType<typeof searchSchema>
