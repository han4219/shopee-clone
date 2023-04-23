import React, { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameError?: string
  classNameInput?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  { classNameInput, className, classNameError, errorMessage, onChange, ...rest },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if ((/^\d+$/g.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }

  return (
    <div className={className}>
      <input onChange={handleChange} className={classNameInput} ref={ref} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
