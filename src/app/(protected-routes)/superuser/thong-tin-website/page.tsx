'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useState, useEffect } from 'react'
import UploadImg from '@/components/shared/UploadImg'
import InputForm from '@/components/shared/InputForm'
import webInfoApi from '@/apis/webinfo'

interface DataItem {
  _id: string
  type: string
  value?: string
  mediaFileId?: string
  __v: number
  createdAt: string
  updatedAt: string
}

const ThongTinWeb = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['allinfo'],
    queryFn: () => webInfoApi.getAllWebInfo(),
  })

  const updateImgWebInfo = useMutation({
    mutationFn: webInfoApi.updateImgWebinfo,
    onSuccess: () => {
      toast.success('Chỉnh sửa thông tin thành công!')

      queryClient.invalidateQueries({ queryKey: ['allinfo'] })
    },
    onError: (error) => {
      toast.error('Đã có lỗi xảy ra, thử lại sau')
    },
  })

  const updateWebInfo = useMutation({
    mutationFn: webInfoApi.updateWebInfo,
    onSuccess: () => {
      toast.success('Chỉnh sửa thông tin thành công!')

      queryClient.invalidateQueries({ queryKey: ['webinfo'] })
    },
    onError: (error) => {
      toast.error('Đã có lỗi xảy ra, thử lại sau')
    },
  })

  const [avatar, setAvatar] = useState<string>('')
  const [banner, setBanner] = useState<string>('')
  const [footerLogo, setFooterLogo] = useState<string>('')
  const [copyrightLogo, setCopyrightLogo] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phonenumber, setPhonenumber] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    if (data) {
      data.forEach((item: DataItem) => {
        switch (item.type) {
          case 'ADDRESS':
            setAddress(item.value || '')
            break
          case 'EMAIL':
            setEmail(item.value || '')
            break
          case 'PHONENUMBER':
            setPhonenumber(item.value || '')
            break
          case 'LOGO_AVATAR':
            setAvatar(item.mediaFileId || '')
            break
          case 'LOGO_BANNER':
            setBanner(item.mediaFileId || '')
            break
          case 'LOGO_FOOTER':
            setFooterLogo(item.mediaFileId || '')
            break
          case 'LOGO_COPYRIGHT':
            setCopyrightLogo(item.mediaFileId || '')
            break
          default:
            break
        }
      })
    }
  }, [data])

  const handleUploadImg = (type: string, file: File) => {
    const webInfoJson = JSON.stringify({ type: type })
    const data = { webInfoJson: webInfoJson, image: file }

    updateImgWebInfo.mutate(data)
  }

  const handleSubmit = (id: string, value: string) => {
    const webInfoJson = JSON.stringify({ type: id, value: value })
    const data = { webInfoJson: webInfoJson }

    updateWebInfo.mutate(data)
  }

  const handleAvatarUpload = (file: File) => {
    handleUploadImg('LOGO_AVATAR', file)
  }
  const handleBannerUpload = (file: File) => handleUploadImg('LOGO_BANNER', file)
  const handleFooterLogoUpload = (file: File) => handleUploadImg('LOGO_FOOTER', file)
  const handleCopyrightLogoUpload = (file: File) => handleUploadImg('LOGO_COPYRIGHT', file)

  return (
    <div className='w-full lg:bg-sky-600 bg-white lg:pt-8 pt-0 lg:px-2 px-0 pb-4 h-fit'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4'>
        <p className='text-black font-semibold text-2xl leading-8 mb-6 md:text-start text-center'>
          Thông tin website
        </p>

        <span className='mt-6 text-xl font-medium'>Hình ảnh</span>
        <div className='flex flex-col border border-[#CBD5E1] rounded-xl py-4 px-8 mb-6 mt-2'>
          <UploadImg
            imgId={avatar}
            id='avatar'
            avatar
            onChange={handleAvatarUpload}
            label='Avatar'
          />
          <UploadImg imgId={banner} id='banner' onChange={handleBannerUpload} label='Banner' />
          <UploadImg
            imgId={footerLogo}
            id='footerLogo'
            onChange={handleFooterLogoUpload}
            label='Footer Logo'
          />
          <UploadImg
            imgId={copyrightLogo}
            id='copyrightLogo'
            onChange={handleCopyrightLogoUpload}
            label='Copyright Logo'
          />
        </div>

        <span className='mt-6 text-xl font-medium'>Thông tin</span>
        <div className='flex flex-col border border-[#CBD5E1] rounded-xl py-4 px-8 mt-2'>
          <InputForm
            id='ADDRESS'
            label='Địa chỉ'
            initialValue={address}
            onSubmit={handleSubmit}
            placeholder='Nhập địa chỉ'
          />
          <InputForm
            id='PHONENUMBER'
            label='Số điện thoại'
            initialValue={phonenumber}
            onSubmit={handleSubmit}
            placeholder='Nhập số điện thoại'
            className='md:mt-2 mt-3'
          />
          <InputForm
            id='EMAIL'
            label='Email'
            initialValue={email}
            onSubmit={handleSubmit}
            placeholder='Nhập email'
            className='md:mt-2 mt-3'
          />
        </div>
      </div>
    </div>
  )
}

export default ThongTinWeb
