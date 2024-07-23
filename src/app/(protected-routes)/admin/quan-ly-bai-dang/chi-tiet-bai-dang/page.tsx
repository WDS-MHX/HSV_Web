'use client'

import { GrLinkPrevious } from 'react-icons/gr'
import { useState, useMemo, useEffect } from 'react'

import dynamic from 'next/dynamic'
import React from 'react'
import generateFroalaConfig from '@/configs/froala.config'
import '@/styles/froala-custom.css'
import { useRouter } from 'next/navigation'
import { ADMIN_PATH_NAME } from '@/configs'
import { PostTimer } from './component'
import { useForm } from 'react-hook-form'
import { CreatePostDto, postSchema } from '@/models/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import postApi from '@/apis/post'
import { Input, Label, Textarea } from '@/components/ui'

const FroalaEditorComponent = dynamic(() => import('@/components/shared/FroalaEditorComponent'), {
  ssr: false,
})

const TaoBaiDang = () => {
  const [isPost, setIsPost] = useState<boolean>(true)
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])
  const [content, setContent] = useState<string>('')
  const [postTime, setPostTime] = useState<Date | undefined>(new Date())

  const router = useRouter()
  const backPreviousPage = () => {
    router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostDto>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: 'hello',
      description: '',
      content: '',
      postedDate: new Date(),
    },
  })

  useEffect(() => {
    if (postTime) {
      setValue('postedDate', postTime)
    }
  }, [postTime, setValue])

  useEffect(() => {
    if (content) {
      setValue('content', content)
    }
  }, [content, setValue])

  const { mutate: createPost } = useMutation({
    mutationFn: (data: CreatePostDto) =>
      postApi.createPost({
        ...data,
      }),
    onSuccess: () => {
      //toast
      backPreviousPage()
    },
    onError: () => {
      //toast
    },
  })

  const onSubmit = (data: CreatePostDto) => {
    alert(1)
    createPost(data)
  }

  return (
    <div className='w-full bg-[#E0F2FE] lg:pt-8 px-2 pb-4 h-full'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4 h-full'
      >
        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4 items-center'>
            <button onClick={backPreviousPage}>
              <GrLinkPrevious className='text-black' />
            </button>
            <div className='flex items-center py-0.5 px-2.5 rounded-full bg-slate-100'>
              <span className='font-semibold text-xs text-primary'>Chưa đăng</span>
            </div>
          </div>
          <div className='flex divide-x'>
            <div className='px-4'>
              <PostTimer datetime={postTime} selectDatetime={setPostTime}>
                <button className='text-sm rounded-md p-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full'>
                  Hẹn giờ đăng
                </button>
              </PostTimer>
            </div>
            <div className='px-4'>
              <button
                type='submit'
                className='text-sm rounded-md px-4 py-2 text-white font-medium bg-sky-600 w-full'
              >
                Đăng
              </button>
            </div>
          </div>
        </div>
        <div className='mb-8'>
          <h3 className='text-2xl font-semibold mb-4'>Thông tin chung</h3>
          <div className='space-y-2'>
            <div>
              <Label htmlFor='title' className='mb-1'>
                Tiêu đề <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='title'
                {...register('title')}
                placeholder='Nhập tiêu đề'
                className='w-full bg-[#F9F9F9]'
              />
              {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor='description' className='mb-1'>
                Mô tả <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='description'
                {...register('description')}
                placeholder='Nhập mô tả'
                className='w-full bg-[#F9F9F9]'
              />
              {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
            </div>
          </div>
        </div>
        <div className='h-auto'>
          <h3 className='text-2xl font-semibold mb-4'>
            Nội dung <span className='text-red-500'>*</span>
          </h3>
          <FroalaEditorComponent
            tag='textarea'
            config={froalaConfig}
            model={content}
            onModelChange={(e: string) => setContent(e)}
          />
        </div>
      </form>
    </div>
  )
}

export default TaoBaiDang
