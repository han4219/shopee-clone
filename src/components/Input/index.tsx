import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  rules?: RegisterOptions
  register?: UseFormRegister<any>
}

export default function Input({
  name,
  type,
  rules,
  register,
  className,
  placeholder,
  errorMessage,
  classNameError = 'mt-1 min-h-[1.5rem] pl-2 text-sm text-red-600',
  classNameInput = 'w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm'
}: Props) {
  const registerResult = name && register ? register(name, rules) : {}
  return (
    <div className={className}>
      <input className={classNameInput} type={type} autoComplete='on' placeholder={placeholder} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
