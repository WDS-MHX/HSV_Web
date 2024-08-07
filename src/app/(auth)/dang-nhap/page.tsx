'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'

import { authApi } from '@/apis'
import { ADMIN_PATH_NAME, AUTH_PATH_NAME } from '@/configs'

interface ILoginFormInputs {
  email: string
  password: string
}

export default function AdminLogin() {
  const router = useRouter()
  const [isShow, setIsShow] = useState(false)

  const handleShow = () => {
    setIsShow(!isShow)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>()

  const mutation = useMutation({
    mutationFn: ({ email, password }: ILoginFormInputs) => authApi.logIn(email, password),
    onSuccess: (data) => {
      console.log('Login successful:', data)
      router.push('/admin/redirect')
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        toast.error((error.response.data as { message: string }).message)
      } else {
        toast.error('Đã xảy ra lỗi, hãy đăng nhập lại')
      }
    },
  })

  const onSubmit = (data: ILoginFormInputs) => {
    mutation.mutate(data)
  }

  return (
    <>
      <h1 className='text-sky-600 font-semibold text-xl text-center mt-4'>Chào mừng !</h1>
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
          <label htmlFor='password' className='block'>
            Mật khẩu
          </label>
          <div className='relative flex w-full items-center'>
            <input
              type={isShow ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
              })}
              className='w-full rounded-md border border-[#CBD5E1] px-[12px] py-[8px]'
              placeholder='Mật khẩu'
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
          {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
        </div>
        <div className='py-2'>
          <button
            type='submit'
            className='w-full bg-sky-600 hover:bg-sky-600/80 text-white p-3 rounded-md'
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </div>
      </form>
      <Link
        href={AUTH_PATH_NAME.QUEN_MAT_KHAU}
        className='flex mt-4 justify-center items-center w-full hover:underline text-secondaryColor text-sm'
      >
        Quên mật khẩu
      </Link>
    </>
  )
}
