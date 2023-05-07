import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import DateSelect from './DateSelect'
import { toast } from 'react-toastify'
import { AppAuthContext } from 'src/contexts/AuthContext'
import { setUserToLS } from 'src/utils/auth'
import { getAvatarURL, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseError } from 'src/types/utils.type'

type FormData = Pick<UserSchema, 'address' | 'avatar' | 'date_of_birth' | 'name' | 'phone'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['address', 'avatar', 'date_of_birth', 'name', 'phone'])

export default function Profile() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch
  } = useForm<FormData>({
    defaultValues: {
      address: '',
      avatar: '',
      name: '',
      phone: '',
      date_of_birth: new Date(2000, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const avatar = watch('avatar')

  const inputFileRef = useRef<HTMLInputElement>(null)
  const [fileFromLocal, setFileFromLocal] = useState<File>()
  const previewImage = useMemo(() => {
    return fileFromLocal ? URL.createObjectURL(fileFromLocal) : ''
  }, [fileFromLocal])

  const { setUser } = useContext(AppAuthContext)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['get-profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (fileFromLocal) {
        const form = new FormData()
        form.append('image', fileFromLocal)
        const uploadResult = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadResult.data.data
        setValue('avatar', avatarName)
      }

      const res = await updateProfileMutation.mutateAsync({
        ...data,
        avatar: avatarName,
        date_of_birth: new Date(data?.date_of_birth || '').toISOString()
      })
      toast.success(res.data.message, {
        position: 'bottom-left',
        autoClose: 1000
      })
      setUser(res.data.data)
      setUserToLS(res.data.data)
      refetch()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ResponseError<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileFromLocal(file)
  }

  const handleUpload = () => {
    inputFileRef.current?.click()
  }

  useEffect(() => {
    if (profile) {
      console.log(getAvatarURL(profile.avatar))
      setValue('address', profile.address)
      setValue('avatar', getAvatarURL(profile.avatar))
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(2000, 0, 1))
    }
  }, [profile, setValue])

  return (
    <div className='rounded-sm bg-white px-10 py-4 shadow'>
      <div className='border-b border-b-gray-200 pb-4'>
        <div className='text text-xl capitalize'>hồ sơ của tôi</div>
        <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='flex flex-col-reverse py-4 md:flex-row' onSubmit={onSubmit}>
        <div className='w-full'>
          <div className='flex-grow md:pr-10'>
            <div className='flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Tên</div>
              </div>
              <div className='basis-4/5 md:w-full'>
                <Input
                  name='name'
                  register={register}
                  errorMessage={errors.name?.message}
                  classNameError='mt-1 pl-2 text-sm text-red-600'
                  classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
                />
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Email</div>
              </div>
              <div className='basis-4/5 md:w-full'>
                <div>{profile?.email}</div>
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Số điện thoại</div>
              </div>
              <div className='basis-4/5 md:w-full'>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      onChange={field.onChange}
                      errorMessage={errors.phone?.message}
                      classNameError='mt-1 pl-2 text-sm text-red-600'
                      classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
                    />
                  )}
                />
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'>
                <div className='text-left text-gray-500 md:text-right'>Địa chỉ</div>
              </div>
              <div className='basis-4/5 md:w-full'>
                <Input
                  name='address'
                  register={register}
                  errorMessage={errors.address?.message}
                  classNameError='mt-1 pl-2 text-sm text-red-600'
                  classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  value={field.value}
                  onChange={field.onChange}
                  errorMessage={errors.date_of_birth?.message}
                />
              )}
            />
            <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
              <div className='basis-1/5 pr-4 md:w-full'></div>
              <div className='basis-4/5 md:w-full'>
                <button
                  type='submit'
                  className='rounded-sm bg-orange px-6 py-2 text-white transition-colors hover:bg-orange/80'
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='md:w-72 md:border-l md:border-l-gray-200 md:px-10'>
          <div className='flex w-full flex-col items-center'>
            <div className='h-20 w-20 overflow-hidden rounded-full'>
              <img
                className='h-full w-full object-cover'
                src={previewImage || profile?.avatar ? getAvatarURL(avatar) : avatar}
                alt=''
              />
            </div>
            <input
              type='file'
              accept='.jpg,.jpeg,.png'
              className='hidden'
              ref={inputFileRef}
              onChange={handleFileChange}
            />
            <button onClick={handleUpload} type='button' className='my-4 rounded-sm border bg-none px-4 py-2'>
              Chọn Ảnh
            </button>
            <div className='text-xs text-gray-500'>Dung lượng file tối đa 1 MB</div>
            <div className='text-xs text-gray-500'>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
      </form>
    </div>
  )
}
