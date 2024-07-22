'use client'

import { GrLinkPrevious } from 'react-icons/gr'
import { useState, useMemo } from 'react'

import dynamic from 'next/dynamic'
import generateFroalaConfig from '@/configs/froala.config'
import '@/styles/froala-custom.css'
import { useParams, useRouter } from 'next/navigation'
import { ADMIN_PATH_NAME } from '@/configs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs/queryKeys'
import postApi from '@/apis/post'

const FroalaEditorComponent = dynamic(() => import('@/components/shared/FroalaEditorComponent'), {
  ssr: false,
})

const ChiTietBaiDang = () => {
  const { id: postId } = useParams<{ id: string }>()
  const [isPost, setIsPost] = useState<boolean>(true)
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])
  const [content, setContent] = useState<string>('')
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: queryKeys.post.gen(postId),
    queryFn: () => postApi.getPostById(postId),
  })

  const backPreviousPage = () => {
    router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
  }

  const { mutate: updateShowPost } = useMutation({
    mutationFn: () => postApi.updateShowPost(postId, !data?.showPost),
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.post.gen(postId))
    },
  })
  const { mutate: deletePost } = useMutation({
    mutationFn: () => postApi.deletePost(postId),
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.post.gen(postId))
      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
    },
  })

  return (
    <div className='w-full bg-[#E0F2FE] lg:pt-8 px-2 pb-4 h-full'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4 h-full'>
        <div className='flex justify-between items-center mb-6'>
          <button className='flex gap-4' onClick={backPreviousPage}>
            <GrLinkPrevious className='text-black' />
            <span className='font-semibold text-xs text-primary hover:underline'>
              {data?.showPost ? 'Đã đăng' : 'Chưa đăng'}
            </span>
          </button>
          <div className='flex divide-x w-[194px]'>
            <div>
              <button
                onClick={() => deletePost()}
                className='text-sm rounded-md px-4 py-2 text-[#0F172A] font-medium bg-[#BF202E] w-full hover:font-bold hover:bg-[#e2e8f0c9]'
              >
                Gỡ
              </button>
              <button
                onClick={() => updateShowPost()}
                className='text-sm rounded-md p-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full hover:font-bold hover:bg-[#e2e8f0c9]'
              >
                Hẹn giờ đăng
              </button>
            </div>
            <div className='flex gap-1.5'>
              <button
                onClick={() => updateShowPost()}
                className='text-sm rounded-md px-4 py-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full hover:font-bold hover:bg-[#e2e8f0c9]'
              >
                {data?.showPost ? 'Ẩn' : 'Đăng'}
              </button>
              <button className='text-sm rounded-md px-4 py-2 text-white font-medium bg-[#0284C7] w-full hover:font-bold hover:bg-[#0285c7d5]'>
                Lưu
              </button>
            </div>
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
