'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'

import { authApi } from '@/apis'
import { AUTH_PATH_NAME } from '@/configs'

interface IResetPasswordFormInputs {
  email: string
  newPassword: string
  rePassword: string
  otpCode: string
}

export default function ResetPassword() {
  const router = useRouter()

  const [otpCode, setOtpCode] = useState<string>('')
  const [countdown, setCountdown] = useState(0)
  const [isShow, setIsShow] = useState(false)

  const handleShow = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleOtpChange = (index: number, value: string) => {
    if (value === '') {
      const newOtpCode = otpCode.split('')
      newOtpCode[index] = ''
      setOtpCode(newOtpCode.join(''))
      document.getElementById(`otp-${index - 1}`)?.focus()
    } else if (/^\d$/.test(value)) {
      const newOtpCode = otpCode.split('')
      newOtpCode[index] = value
      setOtpCode(newOtpCode.join(''))
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IResetPasswordFormInputs>()

  const mutation = useMutation({
    mutationFn: ({ email, otpCode, newPassword }: IResetPasswordFormInputs) =>
      authApi.resetPassword(email, otpCode, newPassword),
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công, yêu cầu đăng nhập lại')
    },
    onError: (error) => {
      toast.error('Đã xảy ra lỗi, thử lại sau')
    },
  })

  const resendOtpMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      toast.success('OTP đã được gửi lại')
    },
    onError: (error) => {
      toast.error('Đã xảy ra lỗi, thử lại sau')
    },
  })

  const onSubmit = (data: IResetPasswordFormInputs) => {
    if (data.newPassword !== data.rePassword) {
      return toast.error('Mật khẩu mới và xác minh mật khẩu không khớp')
    }

    data.otpCode = otpCode
    mutation.mutate(data)
    router.push(AUTH_PATH_NAME.RESET_MAU_KHAU)
  }

  useEffect(() => {
    setValue('otpCode', otpCode)
  }, [otpCode, setValue])

  return (
    <>
      <h1 className='text-sky-600 font-semibold text-xl text-center mt-4'>Đổi mật khẩu</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='container text-black block md:px-4 py-2 space-y-4 m-auto'
      >
        <div className='space-y-1'>
          <label htmlFor='email' className='block'>
            Email
          </label>
          <input
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
            className='w-full rounded-md border border-[#CBD5E1] px-[12px] py-[8px]'
            placeholder='Email'
          />
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
        </div>

        <div className='space-y-1'>
          <label htmlFor='newPassword' className='block'>
            Mật khẩu
          </label>
          <div className='relative flex w-full items-center'>
            <input
              type={isShow ? 'text' : 'password'}
              {...register('newPassword', {
                required: 'New password is required',
              })}
              className='w-full rounded-md border border-[#CBD5E1] px-[12px] py-[8px]'
              placeholder='Mật khẩu mới'
            />
            <button
              type='button'
              onClick={handleShow}
              className='text-cool-gray-60 absolute right-4'
            >
              {isShow ? (
                <LiaEyeSolid size={24} color='#475569' />
              ) : (
                <LiaEyeSlashSolid size={24} color='#475569' />
              )}
            </button>
          </div>
          {errors.newPassword && <p className='text-red-600'>{errors.newPassword.message}</p>}
        </div>

        <div className='space-y-1'>
          <label htmlFor='rePassword' className='block'>
            Xác minh mật khẩu mới
          </label>
          <div className='relative flex w-full items-center'>
            <input
              type={isShow ? 'text' : 'password'}
              {...register('rePassword', {
                required: 'Verify password is required',
              })}
              className='w-full rounded-md border border-[#CBD5E1] px-[12px] py-[8px]'
              placeholder='Xác minh mật khẩu'
            />
            <button
              type='button'
              onClick={handleShow}
              className='text-cool-gray-60 absolute right-4'
            >
              {isShow ? (
                <LiaEyeSolid size={24} color='#475569' />
              ) : (
                <LiaEyeSlashSolid size={24} color='#475569' />
              )}
            </button>
          </div>
          {errors.rePassword && <p className='text-red-600'>{errors.rePassword.message}</p>}
        </div>

        <div className='space-y-1'>
          <label className='block'>Nhập OTP</label>
          <div className='flex w-full justify-between'>
            <div className='otp-input flex'>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type='text'
                  value={otpCode[index] || ''}
                  maxLength={1}
                  className='w-10 h-10 text-center border border-gray-300 rounded-md mx-[1px]'
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <button
              type='button'
              className='px-4 py-2 rounded-md text-[#0F172A] bg-[#F1F5F9] hover:bg-[#f1f5f9c0] text-sm font-medium'
              onClick={() => {
                setCountdown(15)
                resendOtpMutation.mutate(getValues('email'))
              }}
              disabled={mutation.status === 'pending' || countdown > 0}
            >
              {mutation.status === 'pending'
                ? 'Đang gửi...'
                : countdown > 0
                  ? `Chờ ${countdown}s`
                  : 'Gửi lại'}
            </button>
          </div>
        </div>
        <div className='py-2'>
          <button
            type='submit'
            className='w-full bg-sky-600 hover:bg-sky-600/80 text-white p-3 rounded-md'
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' ? 'Đang gửi...' : 'Đổi mật khẩu'}
          </button>
        </div>
      </form>
      <Link
        href={AUTH_PATH_NAME.DANG_NHAP}
        className='flex mt-4 justify-center items-center w-full hover:underline text-secondaryColor text-sm'
      >
        Đăng nhập
      </Link>
    </>
  )
}
