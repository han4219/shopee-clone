import React from 'react'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RegisterFormData, registerSchema } from 'src/utils/rules'

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log(data)
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

              <button
                className='mt-3 w-full rounded-sm bg-orange py-2 text-lg font-normal uppercase text-white hover:shadow-md'
                type='submit'
              >
                Đăng ký
              </button>
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
