'use client'

import { GrLinkPrevious } from 'react-icons/gr'
import { useState, useMemo, useEffect, useRef } from 'react'

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
import { imgContent, UpdatePostDTO } from '@/models/post'
import { fileApi } from '@/apis'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import RemoveImageAlert from '@/components/ui/removeImageAlert'
import { POST_CATEGORY, POST_STATUS } from '@/configs/enum'

const FroalaEditorComponent = dynamic(() => import('@/components/shared/FroalaEditorComponent'), {
  ssr: false,
})

const ChiTietBaiDang = () => {
  const { id: postId } = useParams<{ id: string }>()

  const { data } = useQuery({
    queryKey: queryKeys.post.gen(postId),
    queryFn: () => postApi.getPostById(postId),
  })

  const [contentImageIds, setContentImageIds] = useState<imgContent[]>([])
  const [checkExistImage, setCheckExistImage] = useState<string | undefined>()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const contentImageIdsRef = useRef(contentImageIds)
  const [idImageRemoved, setIdImageRemoved] = useState<string | undefined>()
  useEffect(() => {
    contentImageIdsRef.current = contentImageIds
  }, [contentImageIds])
  async function removeImage(idImageRemoved: string) {
    if (idImageRemoved) await fileApi.removeImage(idImageRemoved)
  }
  useEffect(() => {
    if (idImageRemoved) {
      removeImage(idImageRemoved)
    }
  }, [idImageRemoved])
  const froalaConfig = useMemo(
    () =>
      generateFroalaConfig(
        setContentImageIds,
        contentImageIdsRef.current,
        setIdImageRemoved,
        setCheckExistImage,
        setOpenDialog,
      ),
    [setContentImageIds],
  )
  function confirmDeleteImg() {
    if (checkExistImage) {
      removeImage(checkExistImage)
      setConfirmDelete(false)
      setCheckExistImage(undefined)
      setOpenDialog(false)
    }
  }
  function denyDeleteImg() {
    setConfirmDelete(false)
    setCheckExistImage(undefined)
    setOpenDialog(false)
  }
  const [content, setContent] = useState<string>('')
  const [postTime, setPostTime] = useState<Date | undefined>(new Date())

  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      setContent(data.content ?? '')
      setPostTime(data.postedDate ?? new Date())
      let newContentImageIds = data.contentImageIds?.map((id) => ({
        id: id,
        contentId: '',
      }))
      if (newContentImageIds && newContentImageIds?.length > 0)
        setContentImageIds(newContentImageIds)
    }
  }, [data])

  const backPreviousPage = () => {
    router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
  }

  const { mutate: updateShowPost } = useMutation({
    mutationFn: () => postApi.updateShowPost(postId, !data?.showPost),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminSearchPosts.gen(
          1,
          5,
          '',
          [
            POST_CATEGORY.GIOI_THIEU,
            POST_CATEGORY.SINH_VIEN_5_TOT,
            POST_CATEGORY.CAU_CHUYEN_DEP,
            POST_CATEGORY.TINH_NGUYEN,
            POST_CATEGORY.NCKH,
            POST_CATEGORY.HO_TRO_SINH_VIEN,
            POST_CATEGORY.XAY_DUNG_HOI,
          ],
          POST_STATUS.POSTED,
        ),
      })
      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
    },
  })
  const { mutate: deletePost } = useMutation({
    mutationFn: () => postApi.deletePost(postId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminSearchPosts.gen(
          1,
          5,
          '',
          [
            POST_CATEGORY.GIOI_THIEU,
            POST_CATEGORY.SINH_VIEN_5_TOT,
            POST_CATEGORY.CAU_CHUYEN_DEP,
            POST_CATEGORY.TINH_NGUYEN,
            POST_CATEGORY.NCKH,
            POST_CATEGORY.HO_TRO_SINH_VIEN,
            POST_CATEGORY.XAY_DUNG_HOI,
          ],
          POST_STATUS.POSTED,
        ),
      })
      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
    },
  })

  const { mutate: updatePost } = useMutation({
    mutationFn: (data: UpdatePostDTO) =>
      postApi.updatePost({
        ...data,
      }),
    onSuccess: () => {
      //toast
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminSearchPosts.gen(
          1,
          5,
          '',
          [
            POST_CATEGORY.GIOI_THIEU,
            POST_CATEGORY.SINH_VIEN_5_TOT,
            POST_CATEGORY.CAU_CHUYEN_DEP,
            POST_CATEGORY.TINH_NGUYEN,
            POST_CATEGORY.NCKH,
            POST_CATEGORY.HO_TRO_SINH_VIEN,
            POST_CATEGORY.XAY_DUNG_HOI,
          ],
          POST_STATUS.POSTED,
        ),
      })

      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
    },
    onError: () => {
      //toast
    },
  })

  const onSubmit = () => {
    console.log('VAOSUBMIT')
    const contentImagesIdArr: Array<string> = contentImageIds.map((item) => item.id)
    if (postTime && data?.title) {
      let dataPost = {
        ...data,
        contentImageIds: contentImagesIdArr,
        titleImageId: contentImagesIdArr[0],
        postedDate: postTime,
        _id: postId,
        content: content,
        description: data.description ?? '',
      }
      console.log('DATAFINAL', dataPost)
      updatePost(dataPost)
    }
  }

  return (
    <div className='w-full lg:bg-sky-600 bg-white lg:pt-8 pt-0 lg:px-2 px-0 pb-4 h-full'>
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
                className='text-sm rounded-md px-4 py-2 text-white font-medium bg-[#BF202E] w-full transition-colors cursor-pointer'
              >
                Gỡ
              </RemoveAlert>
              <PostTimer datetime={postTime} selectDatetime={setPostTime}>
                <button className='text-sm rounded-md p-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full transition-colors whitespace-nowrap'>
                  Hẹn giờ đăng
                </button>
              </PostTimer>
            </div>
            <div className='flex gap-1.5 px-4'>
              <button
                onClick={() => updateShowPost()}
                className='text-sm rounded-md px-4 py-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full'
              >
                {data?.showPost ? 'Ẩn' : 'Đăng'}
              </button>
              <button
                onClick={() => onSubmit()}
                className='text-sm rounded-md px-4 py-2 text-white font-medium bg-[#0284C7] w-full'
              >
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
          <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
            <DialogContent asChild>
              <DialogHeader className='flex flex-row items-center justify-center w-full'>
                <DialogTitle>Bạn có đồng ý xóa ảnh?</DialogTitle>
              </DialogHeader>
              <div className='flex w-full items-center justify-center gap-4'>
                <Button
                  onClick={() => confirmDeleteImg()}
                  className='bg-green-600 px-4 py-2 text-white hover:bg-green-800'
                >
                  Đồng ý
                </Button>
                <Button
                  onClick={() => denyDeleteImg()}
                  className='bg-red-600 px-4 py-2 text-white hover:bg-red-800'
                >
                  Hủy bỏ
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ChiTietBaiDang
