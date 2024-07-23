'use client'

import { GrLinkPrevious } from 'react-icons/gr'
import { useState, useMemo, useEffect } from 'react'

import dynamic from 'next/dynamic'
import generateFroalaConfig from '@/configs/froala.config'
import '@/styles/froala-custom.css'
import { useParams, useRouter } from 'next/navigation'
import { ADMIN_PATH_NAME } from '@/configs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs/queryKeys'
import postApi from '@/apis/post'
import { RemoveAlert } from '@/components/ui'
import { PostTimer } from '../component'

const FroalaEditorComponent = dynamic(() => import('@/components/shared/FroalaEditorComponent'), {
  ssr: false,
})

const ChiTietBaiDang = () => {
  const { id: postId } = useParams<{ id: string }>()
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])

  const [content, setContent] = useState<string>('')
  const [postTime, setPostTime] = useState<Date | undefined>(new Date())

  const router = useRouter()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: queryKeys.post.gen(postId),
    queryFn: () => postApi.getPostById(postId),
  })

  useEffect(() => {
    if (data) {
      setContent(data.content ?? '')
      setPostTime(data.postedDate ?? new Date())
    }
  }, [data])

  const backPreviousPage = () => {
    router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
  }

  const { mutate: updateShowPost } = useMutation({
    mutationFn: () => postApi.updateShowPost(postId, !data?.showPost),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.post.gen(postId),
      })
    },
  })
  const { mutate: deletePost } = useMutation({
    mutationFn: () => postApi.deletePost(postId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.post.gen(postId),
      })
      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
    },
  })

  return (
    <div className='w-full bg-[#E0F2FE] lg:pt-8 px-2 pb-4 h-full'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4 h-full'>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4 items-center'>
            <button onClick={backPreviousPage}>
              <GrLinkPrevious className='text-black' />
            </button>
            <div className='flex items-center py-0.5 px-2.5 rounded-full bg-slate-100'>
              <span className='font-semibold text-xs text-primary'>
                {data?.showPost ? 'Đã đăng' : 'Chưa đăng'}
              </span>
            </div>
          </div>
          <div className='flex divide-x'>
            <div className='flex gap-1.5 px-4'>
              <RemoveAlert
                title='Bạn có chắc chắn muốn gỡ bài viết này?'
                action={() => deletePost()}
              >
                <button className='text-sm rounded-md px-4 py-2 text-[#0F172A] font-medium bg-[#BF202E] w-full hover:font-bold hover:bg-[#e2e8f0c9]'>
                  Gỡ
                </button>
              </RemoveAlert>
              <PostTimer datetime={postTime} selectDatetime={setPostTime}>
                <button className='text-sm rounded-md p-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full hover:font-bold hover:bg-[#e2e8f0c9]'>
                  Hẹn giờ đăng
                </button>
              </PostTimer>
            </div>
            <div className='flex gap-1.5 px-4'>
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
