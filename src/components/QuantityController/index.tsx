import React, { ChangeEvent } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'
import Minus from 'src/svgs/Minus'
import Plus from 'src/svgs/Plus'

interface Props extends InputNumberProps {
  onTyping?: (value: number) => void
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  max: number
  value: number
}

const QuantityController: React.FC<Props> = ({ max, value, onTyping, onIncrease, onDecrease, ...rest }) => {
  const handleTyping = (event: ChangeEvent<HTMLInputElement>) => {
    let _value
    if (Number(event.target.value) > max) {
      _value = max
    } else {
      _value = Number(event.target.value)
    }
    onTyping && onTyping(_value)
  }

  const handleIncrease = (value: number) => {
    let _value
    if (value >= max) {
      _value = value
    } else {
      _value = value + 1
    }
    onIncrease && onIncrease(_value)
  }

  const handleDecrease = (value: number) => {
    let _value
    if (value <= 1) {
      _value = 1
    } else {
      _value = value - 1
    }
    onDecrease && onDecrease(_value)
  }

  return (
    <div className='flex items-center justify-between rounded-sm border-[1px] border-gray-300'>
      <button onClick={() => handleDecrease(value)} className='border-r-[1px] border-gray-300 p-2'>
        <Minus />
      </button>
      <InputNumber
        onChange={handleTyping}
        classNameInput='outline-none text-center text-black text-base max-w-[70px]'
        value={value !== 0 ? value : 1}
      />
      <button onClick={() => handleIncrease(value)} className='border-l-[1px] border-gray-300 p-2'>
        <Plus />
      </button>
    </div>
  )
}

export default QuantityController
