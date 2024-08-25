'use client'

import { GrLinkPrevious } from 'react-icons/gr'
import { useState, useMemo, useEffect, useRef } from 'react'

import dynamic from 'next/dynamic'
import React from 'react'
import generateFroalaConfig, { FroalaEvents } from '@/configs/froala.config'
import '@/styles/froala-custom.css'
import { useRouter } from 'next/navigation'
import { ADMIN_PATH_NAME } from '@/configs'
import { PostTimer } from './component'
import { useForm } from 'react-hook-form'
import {
  CreatePostDto,
  CreatePostTemporaryDto,
  postSchema,
  postSchemaTemporary,
} from '@/models/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import postApi from '@/apis/post'
import { Input, Label, Textarea } from '@/components/ui'
import { imgContent } from '@/models/post'
import { fileApi } from '@/apis'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/SelectOption'
import { POST_CATEGORY, POST_STATUS } from '@/configs/enum'
import { queryKeys } from '@/configs/queryKeys'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { FiEdit } from 'react-icons/fi'
import { CiImageOn } from 'react-icons/ci'

const FroalaEditorComponent = dynamic(() => import('@/components/shared/FroalaEditorComponent'), {
  ssr: false,
})
const options: readonly {
  optionType: POST_CATEGORY
  optionName: string
  isPlaceHolder?: boolean
}[] = [
  {
    optionType: POST_CATEGORY.GIOI_THIEU,
    optionName: 'Giới thiệu',
  },
  {
    optionType: POST_CATEGORY.SINH_VIEN_5_TOT,
    optionName: 'Sinh viên 5 tốt',
  },
  {
    optionType: POST_CATEGORY.CAU_CHUYEN_DEP,
    optionName: 'Câu chuyện đẹp',
  },
  {
    optionType: POST_CATEGORY.TINH_NGUYEN,
    optionName: 'Tình nguyện',
  },
  {
    optionType: POST_CATEGORY.NCKH,
    optionName: 'NCKH',
  },
  {
    optionType: POST_CATEGORY.HO_TRO_SINH_VIEN,
    optionName: 'Hỗ trợ sinh viên',
  },
  {
    optionType: POST_CATEGORY.XAY_DUNG_HOI,
    optionName: 'Xây dựng hội',
  },
]
const TaoBaiDang = () => {
  const queryClient = useQueryClient()

  const [updateTriggered, setUpdateTriggered] = useState(false)
  const [imageReview, setImageReview] = useState<FileList | null>(null)
  const [dataCreatePost, setDataCreatePost] = useState<CreatePostTemporaryDto>()
  const [titleImgId, setTitleImgId] = useState<string>('')
  const [isPost, setIsPost] = useState<boolean>(true)
  const [contentImageIds, setContentImageIds] = useState<imgContent[]>([])
  const contentImageIdsRef = useRef(contentImageIds)
  const [idImageRemoved, setIdImageRemoved] = useState<string | undefined>()
  const [SelectedCategories, setSelectedCategories] = useState<POST_CATEGORY>(
    POST_CATEGORY.GIOI_THIEU,
  )
  useEffect(() => {
    contentImageIdsRef.current = contentImageIds
  }, [contentImageIds])
  async function removeImage() {
    if (idImageRemoved) await fileApi.removeImage(idImageRemoved)
  }
  useEffect(() => {
    if (idImageRemoved) {
      removeImage()
    }
  }, [idImageRemoved])
  const froalaConfig = useMemo(
    () => generateFroalaConfig(setContentImageIds, contentImageIdsRef.current, setIdImageRemoved),
    [setContentImageIds],
  )
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
  } = useForm<CreatePostTemporaryDto>({
    resolver: zodResolver(postSchemaTemporary),
    defaultValues: {
      title: '',
      description: '',
      content: '',
    },
  })

  // useEffect(() => {
  //   if (postTime) {
  //     setValue('postedDate', postTime)
  //   }
  // }, [postTime, setValue])

  useEffect(() => {
    if (content) {
      setValue('content', content)
    }
  }, [content, setValue])

  const toastId = useRef<ReturnType<typeof toast.loading> | null>(null)

  const { mutate: createPost, isPending } = useMutation({
    onMutate: () => {
      toastId.current = toast.loading('Đang tạo bài viết...')
    },
    mutationFn: (data: CreatePostDto) => postApi.createPost({ ...data }),
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Tạo bài viết thành công!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        })
      }

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

      backPreviousPage()
    },
    onError: () => {
      if (toastId.current) {
        let errorMes = ''

        if (content === '') {
          errorMes = 'Nội dung bài viết không được để trống!'
        } else if (contentImageIds.length === 0) {
          errorMes = 'Thêm ít nhất một hình vào bài viết!'
        }
        toast.update(toastId.current, {
          render: errorMes,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
      }
    },
  })

  const uploadTitleImage = useMutation({
    mutationFn: fileApi.uploadImage,
    onSuccess: (res) => {
      setTitleImgId(res || '')

      setUpdateTriggered(true)
    },
    onError: (error) => {
      toast.error('Đã xảy ra lỗi, thử lại sau')
    },
  })

  useEffect(() => {
    if (updateTriggered && dataCreatePost) {
      onSubmit(dataCreatePost)

      setUpdateTriggered(false)
    }
  }, [titleImgId, updateTriggered])

  const onSubmitTitleImg = (data: CreatePostTemporaryDto) => {
    setDataCreatePost(data)
    if (imageReview) uploadTitleImage.mutate(imageReview)
  }

  const onSubmit = (data: CreatePostTemporaryDto) => {
    const contentImagesIdArr: Array<string> = contentImageIds.map((item) => item.id)
    if (postTime) {
      let dataPost = {
        ...data,
        contentImageIds: contentImagesIdArr,
        titleImageId: titleImgId,
        postedDate: postTime,
        categrory: SelectedCategories,
        showPost: true,
      }
      createPost(dataPost)
    }
  }

  const handleSelectOneCategory = (category: POST_CATEGORY) => {
    setSelectedCategories(category)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 100 * 1024 * 1024

    if (e.target.files) {
      if (e.target.files[0].size > MAX_FILE_SIZE) {
        toast.error('Kích thước tệp vượt quá 100MB!')
        return
      }

      setImageReview(e.target.files)
    }
  }

  return (
    <div className='w-full lg:bg-sky-600 bg-white lg:pt-8 pt-0 lg:px-2 px-0 pb-4 h-full'>
      <form
        onSubmit={handleSubmit(onSubmitTitleImg)}
        className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4 h-full'
      >
        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4 items-center'>
            <div onClick={backPreviousPage}>
              <GrLinkPrevious className='text-black cursor-pointer' />
            </div>
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
                disabled={isPending}
              >
                Đăng
              </button>
            </div>
          </div>
        </div>
        <div className='mb-8'>
          <h3 className='text-2xl font-semibold mb-4'>Thông tin chung</h3>
          <div className='space-y-2'>
            <div className='w-full flex justify-between items-center'>
              <div className='w-full'>
                <Label htmlFor='title' className='mb-1'>
                  Tiêu đề <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='title'
                  {...register('title')}
                  placeholder='Nhập tiêu đề'
                  className='w-full bg-[#F9F9F9]'
                />
              </div>
              <Select
                onValueChange={(value) => handleSelectOneCategory(value as POST_CATEGORY)}
                defaultValue={options[0].optionType}
              >
                <SelectTrigger className='w-full h-[40px] ml-3 mt-auto'>
                  <SelectValue placeholder='Chọn danh mục'></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Chọn danh mục</SelectLabel>
                    {options.map((i) => (
                      <SelectItem key={i.optionName} value={i.optionType}>
                        {i.optionName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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

            <div>
              <div className='flex gap-4'>
                <Label htmlFor='titleimg' className='mb-4'>
                  Hình ảnh tiêu đề <span className='text-red-500'>*</span>
                </Label>
                <FiEdit className='text-[#0284C7] font-bold' />
              </div>
              <div className='h-[150px] w-[300px]'>
                <label htmlFor='titleimg' className='mt-3 cursor-pointer'>
                  {imageReview && imageReview[0] ? (
                    <img
                      src={
                        URL.createObjectURL(imageReview[0]) ||
                        '/assets/images/picture-placeholder.png'
                      }
                      alt=''
                      className='h-[150px] w-[300px] object-contain'
                    />
                  ) : (
                    <div className='flex flex-col items-center justify-center pb-6 pt-5 h-[150px] w-[300px] border border-gray-500 rounded-xl bg-slate-200'>
                      <CiImageOn size={30} className='text-gray-500' />
                      <p className='my-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold'>Click to upload</span> or drag and drop
                      </p>
                    </div>
                  )}
                  <input
                    id='titleimg'
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </label>
              </div>
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
