'use client'

import { GrLinkPrevious } from 'react-icons/gr'
import { useState, useMemo } from 'react'

import dynamic from 'next/dynamic'
import React from 'react'
import generateFroalaConfig from '@/configs/froala.config'
import '@/styles/froala-custom.css'

const FroalaEditorComponent = dynamic(() => import('@/components/shared/FroalaEditorComponent'), {
  ssr: false,
})

const ChiTietBaiDang = () => {
  const [isPost, setIsPost] = useState<boolean>(true)
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])
  const [content, setContent] = useState<string>('')

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
              {isPost ? 'Gỡ' : 'Đăng'}
            </button>
            <button className='text-sm rounded-md px-4 py-2 text-white font-medium bg-[#0284C7] w-full hover:font-bold hover:bg-[#0285c7d5]'>
              Lưu
            </button>
          </div>
        </div>
        <div className='h-auto'>
          <FroalaEditorComponent
            tag='textarea'
            config={froalaConfig}
            model={content}
            onModelChange={(e: string) => setContent(e)}
          />
        </div>
      </div>
    </div>
  )
}

export default ChiTietBaiDang
