import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { LoginFormData, loginSchema } from 'src/utils/rules'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { loginRequest } from 'src/apis/auth'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import { toast } from 'react-toastify'

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  })

  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: (body: LoginFormData) => loginRequest(body)
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        // TODO save token to localStorage
        navigate('/')
        toast.success('Đăng nhập thành công', {
          position: 'top-center'
        })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<LoginFormData>>(error)) {
          const formError = error.response?.data.data
          console.log(formError, 'form error')
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginFormData, {
                type: 'Server',
                message: formError[key as keyof LoginFormData]
              })
            })
          }
        }
      }
    })
  }

  return (
    <section>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 md:grid-cols-7'>
          <div className='col-span-1 py-24 md:col-span-3 md:col-start-3'>
            <form className='rounded-sm bg-white px-8 py-6 shadow-md' noValidate onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p className='text-xl font-medium'>Đăng nhập</p>
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
              <button
                className='mt-3 w-full rounded-sm bg-orange py-2 text-lg font-normal uppercase text-white hover:shadow-md'
                type='submit'
              >
                Đăng nhập
              </button>
              <div className='mt-5 text-center'>
                <span className='pr-1 text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='text-orange' to={'/register'}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
