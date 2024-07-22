'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import daihoiLogo from '@/../public/daihoiLogo.svg'
import { authApi } from '@/apis'
import { ADMIN_PATH_NAME, AUTH_PATH_NAME } from '@/configs'

interface ILoginFormInputs {
  email: string
  password: string
}

export default function AdminLogin() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>()

  const mutation = useMutation({
    mutationFn: ({ email, password }: ILoginFormInputs) => authApi.logIn(email, password),
    onSuccess: (data) => {
      console.log('Login successful:', data)
      router.push(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG)
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
    <div className='h-screen w-screen items-center flex'>
      <div className='bg-white w-full md:max-w-[470px] px-8 py-16 m-auto'>
        <Image src={daihoiLogo} alt='' height={100} className='m-auto' />
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
              className='w-full rounded-md border border-[#CBD5E1]'
              placeholder='Email'
            />
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          </div>
          <div className='space-y-1'>
            <label htmlFor='password' className='block'>
              Mật khẩu
            </label>
            <input
              type='password'
              {...register('password', {
                required: 'Password is required',
              })}
              className='w-full rounded-md border border-[#CBD5E1]'
              placeholder='Mật khẩu'
            />
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
          className='flex mt-4 justify-center items-center w-full hover:underline text-secondary text-sm'
        >
          Quên mật khẩu
        </Link>
      </div>
    </div>
  )
}
