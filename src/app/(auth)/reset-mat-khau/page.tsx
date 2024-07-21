'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import daihoiLogo from '@/../public/daihoiLogo.svg'
import { authApi } from '@/apis'
import { AUTH_PATH_NAME } from '@/configs'

interface IResetPasswordFormInputs {
  email: string
  newPassword: string
  rePassword: string
  otpCode: string
}

export default function ResetPassword() {
  const [otpCode, setOtpCode] = useState<string>('')
  const router = useRouter()

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
  } = useForm<IResetPasswordFormInputs>()

  const mutation = useMutation({
    mutationFn: ({ email, otpCode, newPassword }: IResetPasswordFormInputs) =>
      authApi.resetPassword(email, otpCode, newPassword),
    onError: (error) => {
      console.error('Reset password failed!:', error)
    },
  })

  const onSubmit = (data: IResetPasswordFormInputs) => {
    if (data.newPassword !== data.rePassword) {
      return alert('Mật khẩu mới và xác minh mật khẩu không khớp')
    }

    data.otpCode = otpCode
    mutation.mutate(data)
    router.push(AUTH_PATH_NAME.RESET_MAU_KHAU)
  }

  useEffect(() => {
    setValue('otpCode', otpCode)
  }, [otpCode, setValue])

  return (
    <div className='h-screen w-screen items-center flex'>
      <div className='bg-white w-full md:max-w-[470px] px-8 py-16 m-auto'>
        <Image src={daihoiLogo} alt='' height={100} className='m-auto' />
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
              className='w-full rounded-md border border-[#CBD5E1]'
              placeholder='Email'
            />
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          </div>
          <div className='space-y-1'>
            <label htmlFor='newPassword' className='block'>
              Mật khẩu
            </label>
            <input
              type='password'
              {...register('newPassword', {
                required: 'New password is required',
              })}
              className='w-full rounded-md border border-[#CBD5E1]'
              placeholder='Mật khẩu mới'
            />
            {errors.newPassword && <p className='text-red-600'>{errors.newPassword.message}</p>}
          </div>
          <div className='space-y-1'>
            <label htmlFor='rePassword' className='block'>
              Xác minh mật khẩu mới
            </label>
            <input
              type='password'
              {...register('rePassword', {
                required: 'Verify password is required',
              })}
              className='w-full rounded-md border border-[#CBD5E1]'
              placeholder='Xác minh mật khẩu'
            />
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
          className='flex mt-4 justify-center items-center w-full hover:underline text-secondary text-sm'
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}
