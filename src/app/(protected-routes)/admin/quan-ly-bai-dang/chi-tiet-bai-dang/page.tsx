'use client'

import { GrLinkPrevious } from 'react-icons/gr'
import Editor from './component/Editor'
import { useState } from 'react'

import React from 'react'

const ChiTietBaiDang = () => {
  const [isPost, setIsPost] = useState<boolean>(true)

  return (
    <div className='w-full bg-[#E0F2FE] lg:pt-8 px-2 pb-4 h-full'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4 h-full'>
        <div className='flex justify-between items-center mb-6'>
          <button className='flex gap-4'>
            <GrLinkPrevious className='text-black' />
            <span className='font-semibold text-xs text-primary hover:underline'>
              {isPost ? 'Đã đăng' : 'Chưa đăng'}
            </span>
          </button>
          <div className='flex gap-1.5 w-[194px]'>
            <button className='text-sm rounded-md px-4 py-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full hover:font-bold hover:bg-[#e2e8f0c9]'>
              Gỡ
            </button>
            <button className='text-sm rounded-md px-4 py-2 text-white font-medium bg-[#0284C7] w-full hover:font-bold hover:bg-[#0285c7d5]'>
              Lưu
            </button>
          </div>
        </div>
        <div className='h-auto'>
          <Editor />
        </div>
      </div>
    </div>
  )
}

export default ChiTietBaiDang
