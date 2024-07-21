'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import daihoiLogo from '@/../public/daihoiLogo.svg'
import { authApi } from '@/apis'
import { ADMIN_PATH_NAME } from '@/configs'

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
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  const onSubmit = (data: ILoginFormInputs) => {
    mutation.mutate(data)
  }

  return (
    <div className='h-screen w-screen pt-[100px]'>
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
              className='w-full rounded-md'
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
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className='w-full rounded-md'
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
      </div>
    </div>
  )
}
