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
  })
})

export const loginSchema = schema.pick(['email', 'password'])
export const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export const priceSchema = schema.pick(['price_min', 'price_max'])

export type RegisterFormData = yup.InferType<typeof registerSchema>
export type LoginFormData = yup.InferType<typeof loginSchema>
export type PriceData = yup.InferType<typeof priceSchema>
