'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

interface InputFormProps {
  id: string
  label: string
  initialValue: string
  onSubmit: (id: string, value: string) => void
  placeholder?: string
  className?: string
}

const InputForm = ({
  id,
  label,
  initialValue = '',
  onSubmit,
  placeholder,
  className,
}: InputFormProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
  }

  const handleCancel = () => {
    setIsEdit(false)
    setValue(initialValue)
  }

  const handleSubmit = () => {
    setIsEdit(false)
    onSubmit(id, value)
  }

  return (
    <div className={cn('w-full flex gap-2 items-center min-h-[88px]', className)}>
      <div className='flex-1'>
        <label htmlFor={id} className='block mb-2 text-sm font-medium text-primaryColor'>
          {label}
        </label>
        <div className='flex gap-2 max-md:flex-col max-md:items-end'>
          <input
            type='text'
            id={id}
            value={value}
            className={`border border-[#CBD5E1] text-sm rounded-lg block w-full py-2 px-3 text-primaryColor ${!isEdit ? 'opacity-80' : 'bg-white'}`}
            placeholder={placeholder}
            disabled={!isEdit}
            onChange={handleChange}
          />
          <Button
            className={`bg-sky-600 md:min-w-[100px] max-lg:w-[120px] max-md:h-[42px] ${isEdit ? 'hidden' : ''}`}
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
          </Button>

          <div className={`flex md:flex-col gap-2 md:hidden ${!isEdit ? 'hidden' : ''}`}>
            <Button
              className='bg-sky-600 md:min-w-[100px] max-lg:w-[120px] max-md:h-[42px]'
              onClick={handleSubmit}
            >
              Lưu
            </Button>
            <Button
              className='md:min-w-[100px] max-lg:w-[120px] max-md:h-[42px]'
              variant={'outline'}
              onClick={handleCancel}
            >
              Hủy
            </Button>
          </div>
        </div>
      </div>

      <div className={`flex md:flex-col gap-2 max-md:hidden ${!isEdit ? 'hidden' : ''}`}>
        <Button
          className='bg-sky-600 md:min-w-[100px] max-lg:w-[120px] max-md:h-[42px]'
          onClick={handleSubmit}
        >
          Lưu
        </Button>
        <Button
          className='md:min-w-[100px] max-lg:w-[120px] max-md:h-[42px]'
          variant={'outline'}
          onClick={handleCancel}
        >
          Hủy
        </Button>
      </div>
    </div>
  )
}

export default InputForm
