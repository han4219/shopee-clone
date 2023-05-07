import { range } from 'lodash'
import { ChangeEvent, useEffect, useState } from 'react'

interface Props {
  value?: Date
  errorMessage?: string
  onChange?: (value: Date) => void
}

export default function DateSelect({ value, errorMessage, onChange }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 2000
  })

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueSelect } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  return (
    <div className='mt-6 flex w-full flex-col justify-start md:flex-row md:items-center'>
      <div className='basis-1/5 pr-4 md:w-full'>
        <div className='text-left text-gray-500 md:text-right'>Ngày sinh</div>
      </div>

      <div className='basis-4/5 md:w-full'>
        <div className='flex w-full justify-between'>
          <select
            name='date'
            onChange={handleChange}
            value={value?.getDate() || date.date}
            className='w-[30%] cursor-pointer rounded-sm border border-gray-300 px-4 py-2 hover:border-orange'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            className='w-[30%] cursor-pointer rounded-sm border border-gray-300 px-4 py-2 hover:border-orange'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            className='w-[30%] cursor-pointer rounded-sm border border-gray-300 px-4 py-2 hover:border-orange'
          >
            <option disabled>Năm</option>
            {range(1990, new Date().getFullYear() + 1).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 pl-2 text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
