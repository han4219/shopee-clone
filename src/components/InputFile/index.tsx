import React, { useRef } from 'react'
import { toast } from 'react-toastify'

const MAX_SIZE_AVATAR = 1048576

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.size >= MAX_SIZE_AVATAR || !file?.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG', {
        position: 'bottom-left',
        autoClose: 2000
      })
    } else {
      onChange && onChange(file)
    }
  }

  const handleUpload = () => {
    inputFileRef.current?.click()
  }
  return (
    <>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        ref={inputFileRef}
        onClick={(event) => {
          ;(event.target as any).value = null
        }}
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} type='button' className='my-4 rounded-sm border bg-none px-4 py-2'>
        Chọn Ảnh
      </button>
    </>
  )
}
