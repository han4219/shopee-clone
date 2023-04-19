import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { omit } from 'lodash'
import authApi from 'src/apis/auth'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginFormData, RegisterFormData, registerSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseError } from 'src/types/utils.type'
import { toast } from 'react-toastify'
import { AppAuthContext } from 'src/contexts/AuthContext'
import Button from 'src/components/Button'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated, setUser } = useContext(AppAuthContext)

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<RegisterFormData, 'confirm_password'>) => authApi.register(body)
  })

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (res) => {
        toast('Đăng ký thành công.', {
          position: 'bottom-left'
        })
        setUser(res.data.data.user)
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseError<LoginFormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginFormData, {
                message: formError[key as keyof LoginFormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  }

  return (
    <section>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-7'>
          <div className='col-span-1 py-24 md:col-span-3 md:col-start-3'>
            <form className='rounded-sm bg-white px-8 py-6 shadow-md' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <p className='text-xl font-medium'>Đăng ký</p>
              </div>
              <Input
                className='mt-8'
                type='email'
                name='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input
                name='password'
                className='mt-2'
                type='password'
                placeholder='Mật khẩu'
                errorMessage={errors.password?.message}
                register={register}
              />
              <Input
                name='confirm_password'
                className='mt-2'
                type='password'
                placeholder='Nhập lại mật khẩu'
                errorMessage={errors.confirm_password?.message}
                register={register}
              />

              <Button
                loading={registerMutation.isLoading}
                className='mt-3 flex w-full items-center justify-center rounded-sm bg-orange py-2 text-lg font-normal uppercase text-white transition-all hover:shadow-md'
                type='submit'
              >
                Đăng ký
              </Button>
              <div className='mt-5 flex flex-col items-center text-sm'>
                <span className='text-center'>Bằng việc đăng kí, bạn đã đồng ý với Shopee về</span>
                <p>
                  <span className='cursor-pointer pr-1 text-orange'>Điều khoản dịch vụ</span>&
                  <span className='cursor-pointer pl-1 text-orange'>Chính sách bảo mật</span>
                </p>
              </div>
              <div className='mt-5 flex justify-center'>
                <span className='pr-1 text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-orange' to={'/login'}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
