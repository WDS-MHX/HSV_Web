'use client'

import { useState } from 'react'

import { FiEdit } from 'react-icons/fi'
import { cn } from '@/lib/utils'

interface UploadImageProps {
  imgId?: string
  id: string
  className?: string
  onChange: (file: File) => void
  label?: string
  avatar?: boolean
}

const UploadImg: React.FC<UploadImageProps> = ({
  imgId,
  id,
  className,
  label,
  onChange,
  avatar = false,
}) => {
  // const [imageReview, setImageReview] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setImageReview(e.target.files[0])
      onChange(e.target.files[0])
    }
  }

  return (
    <div className={cn('lg:max-w-[70%] lg:h-[100px] lg:flex mb-6 w-full max-h-[370px]', className)}>
      <div className='flex max-lg:mb-2'>
        <div className='min-w-[120px] mr-3'>{label}</div>
        <label
          htmlFor={id}
          className='rounded-md border border-[#E2E8F0] p-2 mr-6 h-fit cursor-pointer'
        >
          <FiEdit className='text-[#0284C7] font-bold' />
        </label>
      </div>
      <img
        src={
          imgId !== '' || imgId
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${imgId}`
            : '/assets/images/picture-placeholder.png'
        }
        alt='Uploaded image'
        className={`border-0.5 border-sky-600 shadow-[0_3px_10px_rgb(0,0,0,0.1)] max-h-full max-w-full ${avatar ? 'w-[100px] h-[100px] rounded-full object-cover' : 'object-contain'}`}
      />
      <input
        id={id}
        type='file'
        accept='.png, .jpg, .jpeg'
        className='hidden'
        onChange={handleImageChange}
      />
    </div>
  )
}

export default UploadImg
