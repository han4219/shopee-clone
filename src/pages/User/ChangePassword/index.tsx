import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user'
import Input from 'src/components/Input'
import EyeClose from 'src/svgs/EyeClose'
import EyeOpen from 'src/svgs/EyeOpen'
import { ResponseError } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_new_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_new_password'])

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_new_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowNewPassword, setIsShowNewPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync({
        password: data.password,
        new_password: data.new_password
      })
      toast.success(res.data.message, {
        position: 'bottom-left',
        autoClose: 2000
      })
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ResponseError<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-10 py-8 shadow'>
      <div className='border-b border-b-gray-200 pb-4'>
        <div className='text text-xl capitalize'>đổi mật khẩu</div>
        <div className='text-gray-500'>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
      </div>
      <form className='mt-5 flex flex-col justify-center' onSubmit={onSubmit}>
        <div className='w-full md:w-[80%]'>
          <div className='flex flex-col justify-start md:flex-row md:items-center'>
            <div className='basis-1/4'>
              <div className='-mt-2 text-left text-gray-500 md:pr-4 md:text-right'>Mật khẩu cũ</div>
            </div>
            <div className='basis-3/4'>
              <Input
                register={register}
                name='password'
                type={isShowPassword ? 'text' : 'password'}
                autoComplete='true'
                errorMessage={errors.password?.message}
                show={isShowPassword}
                className='relative'
                onToggle={(status) => {
                  setIsShowPassword(status)
                }}
                icon={isShowPassword ? <EyeOpen /> : <EyeClose />}
                classNameError='mt-1 min-h-[1rem] pl-2 text-sm text-red-600'
                classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
              />
            </div>
          </div>
        </div>

        <div className='mt-4 w-full md:w-[80%]'>
          <div className='flex flex-col justify-start md:flex-row md:items-center'>
            <div className='basis-1/4'>
              <div className='-mt-2 text-left text-gray-500 md:pr-4 md:text-right'>Mật khẩu mới</div>
            </div>
            <div className='basis-3/4'>
              <Input
                autoComplete='true'
                register={register}
                errorMessage={errors.new_password?.message}
                type={isShowNewPassword ? 'text' : 'password'}
                name='new_password'
                show={isShowNewPassword}
                className='relative'
                onToggle={(status) => {
                  setIsShowNewPassword(status)
                }}
                icon={isShowNewPassword ? <EyeOpen /> : <EyeClose />}
                classNameError='mt-1 min-h-[1rem] pl-2 text-sm text-red-600'
                classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
              />
            </div>
          </div>
        </div>

        <div className='mt-4 w-full md:w-[80%]'>
          <div className='flex flex-col justify-start md:flex-row md:items-center'>
            <div className='basis-1/4'>
              <div className='-mt-2 text-left text-gray-500 md:pr-4 md:text-right'>Xác nhận mật khẩu</div>
            </div>
            <div className='basis-3/4'>
              <Input
                autoComplete='true'
                register={register}
                name='confirm_new_password'
                errorMessage={errors.confirm_new_password?.message}
                type={isShowConfirmPassword ? 'text' : 'password'}
                show={isShowConfirmPassword}
                className='relative'
                onToggle={(status) => {
                  setIsShowConfirmPassword(status)
                }}
                icon={isShowConfirmPassword ? <EyeOpen /> : <EyeClose />}
                classNameError='mt-1 min-h-[1rem] pl-2 text-sm text-red-600'
                classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
              />
            </div>
          </div>
        </div>

        <div className='mt-4 w-full md:w-[80%]'>
          <div className='flex flex-col justify-start md:flex-row md:items-center'>
            <div className='basis-1/4'></div>
            <div className='basis-3/4'>
              <button className='rounded-sm bg-orange px-4 py-2 text-white transition-colors hover:bg-orange/80'>
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
