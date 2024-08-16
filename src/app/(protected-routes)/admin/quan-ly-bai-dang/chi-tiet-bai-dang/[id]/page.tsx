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
import { Input, Label, RemoveAlert } from '@/components/ui'
import { PostTimer } from '../component'
import {
  CreatePostTemporaryDto,
  imgContent,
  postSchemaTemporary,
  UpdatePostDTO,
} from '@/models/post'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/SelectOption'
import { Textarea } from '@/components/shared/textArea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FroalaEditor from 'react-froala-wysiwyg'
import Image from 'next/image'
import { FiEdit } from 'react-icons/fi'
import { toast } from 'react-toastify'

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

const ChiTietBaiDang = () => {
  const { id: postId } = useParams<{ id: string }>()

  const { data } = useQuery({
    queryKey: queryKeys.post.gen(postId),
    queryFn: () => postApi.getPostById(postId),
    refetchOnMount: 'always',
  })

  const [SelectedCategories, setSelectedCategories] = useState<POST_CATEGORY>(
    data?.categrory ?? POST_CATEGORY.HO_TRO_SINH_VIEN,
  )

  // const editorRef = useRef<FroalaEditor | null>(null);

  const [deleteConfirmed, setDeleteConfirmed] = useState<((confirm: boolean) => void) | null>(null)
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
        setDeleteConfirmed,
      ),
    [setContentImageIds],
  )

  function confirmDeleteImg() {
    if (deleteConfirmed) {
      deleteConfirmed(true)
    }
    setOpenDialog(false)
  }

  useEffect(() => {
    if (checkExistImage) {
      removeImage(checkExistImage)
      setConfirmDelete(false)
      setCheckExistImage(undefined)
    }
  }, [checkExistImage])

  function denyDeleteImg() {
    if (deleteConfirmed) {
      deleteConfirmed(false)
    }
    setConfirmDelete(false)
    setCheckExistImage(undefined)
    setOpenDialog(false)
  }
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [postTime, setPostTime] = useState<Date | undefined>(undefined)
  const [titleImgId, setTitleImgId] = useState<string>('')
  const [titleImg, setTitleImg] = useState<string>('')
  const [updateTriggered, setUpdateTriggered] = useState(false)

  // console.log('LAYDATA', title, content, description, postTime)
  const router = useRouter()
  const queryClient = useQueryClient()

  const badge =
    data && data.postedDate
      ? data.showPost
        ? new Date(data.postedDate) <= new Date()
          ? 'Đã đăng'
          : 'Chưa đăng'
        : 'Đã ẩn'
      : ''

  useEffect(() => {
    if (data) {
      setContent(data.content ?? '')
      setPostTime(data.postedDate ? new Date(data.postedDate) : undefined)
      setDescription(data.description ?? '')
      setTitle(data.title ?? '')
      setSelectedCategories(data.categrory ?? POST_CATEGORY.SINH_VIEN_5_TOT)
      let newContentImageIds = data.contentImageIds?.map((id) => ({
        id: id,
        contentId: '',
      }))
      if (newContentImageIds && newContentImageIds?.length > 0)
        setContentImageIds(newContentImageIds)
      setTitleImgId(data.titleImageId ?? '')
    }
  }, [data])

  useEffect(() => {
    setTitleImg(process.env.NEXT_PUBLIC_API_BASE_URL + '/file/download/' + titleImgId ?? '')
  }, [titleImgId])

  const backPreviousPage = () => {
    router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
  }

  const { mutate: updateShowPost } = useMutation({
    mutationFn: () => postApi.updateShowPost(postId, !data?.showPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.post.gen(postId),
      })
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
          POST_STATUS.NOT_POSTED,
        ),
      })
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
          POST_STATUS.HIDE,
        ),
      })
      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
    },
    onError: () => {
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
    },
  })

  const { mutate: deletePost } = useMutation({
    mutationFn: () => postApi.deletePost(postId),
    onSuccess: () => {
      if (
        data?.showPost &&
        (data.postedDate ? new Date(data.postedDate) : new Date()) <= new Date()
      ) {
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
      } else if (
        data?.showPost &&
        (data.postedDate ? new Date(data.postedDate) : new Date()) > new Date()
      ) {
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
            POST_STATUS.NOT_POSTED,
          ),
        })
      } else {
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
            POST_STATUS.HIDE,
          ),
        })
      }
      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
    },
    onError: () => {
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
    },
  })

  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: (data: UpdatePostDTO) =>
      postApi.updatePost({
        ...data,
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.post.gen(postId),
      })
      if (response && response.postedDate) {
        if ((response.postedDate ? new Date(response.postedDate) : new Date()) <= new Date()) {
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
        } else {
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
              POST_STATUS.NOT_POSTED,
            ),
          })
        }
      }

      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
    },
    onError: () => {
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
    },
  })

  const { mutate: updateNewTitleImg } = useMutation({
    mutationFn: (data: UpdatePostDTO) =>
      postApi.updatePost({
        ...data,
      }),
    onSuccess: () => {
      //toast
      toast.success('Chỉnh sửa hình ảnh tiêu đề thành công!')
    },
    onError: () => {
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
    },
  })

  const uploadTitleImage = useMutation({
    mutationFn: fileApi.uploadImage,
    onSuccess: (res) => {
      setIdImageRemoved(titleImgId)
      setTitleImgId(res || '')

      setUpdateTriggered(true)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (updateTriggered) {
      onUpdatePost()

      setUpdateTriggered(false)
    }
  }, [titleImgId, updateTriggered])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostTemporaryDto>({
    resolver: zodResolver(postSchemaTemporary),
    defaultValues: {
      title: title,
      description: description,
      content: '',
    },
  })

  useEffect(() => {
    if (content) {
      setValue('content', content)
    }
  }, [content, setValue])
  useEffect(() => {
    if (title) {
      setValue('title', title)
    }
  }, [title, setValue])
  useEffect(() => {
    if (description) {
      setValue('description', description)
    }
  }, [description, setValue])

  const onSubmit = (data: CreatePostTemporaryDto) => {
    const contentImagesIdArr: Array<string> = contentImageIds.map((item) => item.id)
    if (postTime && data?.title) {
      let dataPost = {
        ...data,
        categrory: SelectedCategories,
        contentImageIds: contentImagesIdArr,
        titleImageId: titleImgId,
        postedDate: postTime,
        _id: postId,
      }
      updatePost(dataPost)
    }
  }

  const onUpdatePost = () => {
    if (
      postTime &&
      data?.title &&
      data?.description &&
      data?.content &&
      data?.categrory &&
      data?.contentImageIds &&
      data?.postedDate
    ) {
      let dataPost = {
        title: data.title,
        description: data.description,
        content: data.content,
        categrory: data.categrory,
        contentImageIds: data.contentImageIds,
        titleImageId: titleImgId,
        postedDate: new Date(data.postedDate),
        _id: postId,
      }
      updateNewTitleImg(dataPost)
    }
  }

  const handleSelectOneCategory = (category: POST_CATEGORY) => {
    setSelectedCategories(category)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadTitleImage.mutate(e.target.files)
    }
  }

  return (
    <div className='w-full lg:bg-sky-600 bg-white lg:pt-8 pt-0 lg:px-2 px-0 pb-4 h-full'>
      {/* <Form {...form}> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4 h-full'
      >
        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4 items-center'>
            <div onClick={backPreviousPage} className='cursor-pointer'>
              <GrLinkPrevious className='text-black' />
            </div>
            <div className='flex items-center py-0.5 px-2.5 rounded-full bg-slate-100'>
              <span className='font-semibold text-xs text-primary'>{badge}</span>
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
              {data?.showPost && (
                <PostTimer datetime={postTime} selectDatetime={setPostTime}>
                  <button className='text-sm rounded-md p-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full transition-colors whitespace-nowrap'>
                    Hẹn giờ đăng
                  </button>
                </PostTimer>
              )}
            </div>
            <div className='flex gap-1.5 px-4'>
              <button
                onClick={() => updateShowPost()}
                type='button'
                className='text-sm rounded-md px-4 py-2 text-[#0F172A] font-medium bg-[#E2E8F0] w-full'
              >
                {data?.showPost ? 'Ẩn' : 'Đăng'}
              </button>
              <button
                type='submit'
                disabled={isPending}
                className='text-sm rounded-md px-4 py-2 text-white font-medium bg-[#0284C7] w-full'
              >
                Lưu
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
              {data && (
                <Select
                  onValueChange={(value) => handleSelectOneCategory(value as POST_CATEGORY)}
                  defaultValue={data?.categrory}
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
              )}
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

            <div className='mb-4 flex gap-4 items-center'>
              Hình ảnh tiêu đề <span className='text-red-500'>*</span>
              <RemoveAlert
                title='Bạn có chắc chắn muốn thay đổi ảnh tiêu đề, hành động này là không thể hoàn tác'
                action={() => document.getElementById('titleimg')?.click()}
                className='cursor-pointer'
                isChange
              >
                <FiEdit className='text-[#0284C7] font-bold cursor-poniter' />
              </RemoveAlert>
            </div>
            <div className='mt-3'>
              <img
                src={titleImg}
                alt=''
                className='h-[150px] w-[300px] object-contain'
                onError={() => setTitleImg('/assets/images/picture-placeholder.png')}
              />
            </div>
            <input
              id='titleimg'
              type='file'
              accept='.png, .jpg, .jpeg'
              className='hidden'
              onChange={handleImageChange}
            />
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
            <DialogContent>
              <DialogHeader className='flex flex-row items-center justify-center w-full'>
                <DialogTitle>Bạn có đồng ý xóa ảnh?</DialogTitle>
              </DialogHeader>
              <div className='flex w-full items-center justify-center gap-4'>
                <Button
                  onClick={confirmDeleteImg}
                  className='bg-green-600 px-4 py-2 text-white hover:bg-green-800'
                >
                  Đồng ý
                </Button>
                <Button
                  onClick={denyDeleteImg}
                  className='bg-red-600 px-4 py-2 text-white hover:bg-red-800'
                >
                  Hủy bỏ
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </form>
      {/* </Form> */}
    </div>
  )
}

export default ChiTietBaiDang
