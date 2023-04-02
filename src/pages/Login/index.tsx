import React from 'react'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { LoginFormData, loginSchema } from 'src/utils/rules'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data)
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
