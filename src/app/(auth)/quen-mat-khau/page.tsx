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

interface IForgotPasswordFormInputs {
  email: string
}

export default function ForgetPassword() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormInputs>()

  const mutation = useMutation({
    mutationFn: ({ email }: IForgotPasswordFormInputs) => authApi.forgotPassword(email),
    onSuccess: () => {
      router.push(AUTH_PATH_NAME.RESET_MAU_KHAU)
    },
    onError: (error) => {
      console.error('Send OTP failed!:', error)
    },
  })

  const onSubmit = (data: IForgotPasswordFormInputs) => {
    mutation.mutate(data)
  }

  return (
    <div className='h-screen w-screen items-center flex'>
      <div className='bg-white w-full md:max-w-[470px] px-8 py-16 m-auto'>
        <Image src={daihoiLogo} alt='' height={100} className='m-auto' />
        <h1 className='text-sky-600 font-semibold text-xl text-center mt-4'>Xác minh email</h1>
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
          <div className='py-2'>
            <button
              type='submit'
              className='w-full bg-sky-600 hover:bg-sky-600/80 text-white p-3 rounded-md'
              disabled={mutation.status === 'pending'}
            >
              {mutation.status === 'pending' ? 'Đang gửi...' : 'Gửi OTP'}
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
