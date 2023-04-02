import React from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

type Props = {
  name: string
  className: string
  placeholder?: string
  errorMessage?: string
  rules?: RegisterOptions
  register: UseFormRegister<any>
  type: React.HTMLInputTypeAttribute
}

export default function Input({ className, type, placeholder, name, register, errorMessage, rules }: Props) {
  return (
    <div>
      <div className={className}>
        <input
          className='w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
          type={type}
          autoComplete='on'
          placeholder={placeholder}
          {...register(name, rules)}
        />
      </div>
      <div className='mt-1 min-h-[1.5rem] pl-2 text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
