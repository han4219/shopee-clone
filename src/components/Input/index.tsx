import { InputHTMLAttributes, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  icon?: React.ReactNode
  show?: boolean
  classNameInput?: string
  classNameError?: string
  rules?: RegisterOptions
  register?: UseFormRegister<any>
  onToggle?: (status: boolean) => void
}

export default function Input({
  name,
  rules,
  icon,
  show,
  register,
  onToggle,
  className,
  errorMessage,
  classNameError = 'mt-1 min-h-[1.5rem] pl-2 text-sm text-red-600',
  classNameInput = 'w-full rounded-sm border border-gray-300 py-2 px-4 text-base outline-none focus:border-gray-400 focus:shadow-sm',
  ...rest
}: Props) {
  const registerResult = name && register ? register(name, rules) : null
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest}></input>
      <div className={classNameError}>{errorMessage}</div>
      {icon && (
        <button
          type='button'
          onClick={() => {
            onToggle && onToggle(!show)
          }}
          className='absolute top-1/4 right-2 z-10'
        >
          {icon}
        </button>
      )}
    </div>
  )
}
