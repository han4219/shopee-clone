import React, { ChangeEvent, useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'
import Minus from 'src/svgs/Minus'
import Plus from 'src/svgs/Plus'

interface Props extends InputNumberProps {
  onTyping?: (value: number) => void
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  max: number
  value?: number
  increaseBtnClassName?: string
  decreaseBtnClassName?: string
}

const QuantityController: React.FC<Props> = ({
  max,
  value,
  onTyping,
  onIncrease,
  onDecrease,
  classNameInput,
  decreaseBtnClassName = 'border-r-[1px] border-gray-300 p-2',
  increaseBtnClassName = 'border-l-[1px] border-gray-300 p-2',
  ...rest
}) => {
  const [localValue, setLocalValue] = useState(value || 1)
  const handleTyping = (event: ChangeEvent<HTMLInputElement>) => {
    let _value
    if (Number(event.target.value) > max) {
      _value = max
    } else {
      _value = Number(event.target.value)
    }
    onTyping && onTyping(_value)
    setLocalValue(_value)
  }

  const handleIncrease = (value: number) => {
    let _value
    if (value >= max) {
      _value = value
    } else {
      _value = value + 1
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const handleDecrease = (value: number) => {
    let _value
    if (value <= 1) {
      _value = 1
    } else {
      _value = value - 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className='flex items-center justify-between rounded-sm border-[1px] border-gray-300'>
      <button onClick={() => handleDecrease(value || localValue)} className={decreaseBtnClassName}>
        <Minus />
      </button>
      <InputNumber
        onChange={handleTyping}
        classNameInput={classNameInput || 'outline-none text-center text-black text-base max-w-[70px]'}
        value={value || localValue}
      />
      <button onClick={() => handleIncrease(value || localValue)} className={increaseBtnClassName}>
        <Plus />
      </button>
    </div>
  )
}

export default QuantityController
