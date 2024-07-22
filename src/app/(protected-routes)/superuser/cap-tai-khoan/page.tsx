'use client'
import React from 'react'
import { listAdmin } from './data'
import ListAdminTable from '@/components/shared/ListAdminTable'
import { Button } from '@/components/shared/button'
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
  DialogFooter,
} from '@/components/shared/dialog'
import { X } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/shared/form'
import FormGroup from '@/components/shared/form-group'
const formSchema = z.object({
  name: z.string().min(1, 'Vui long nhap ho va ten'),
  phoneNumber: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại của bạn')
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ'),
  email: z.string().min(1, 'Vui long nhap email cua ban').email('Email khong hop le'),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu của bạn')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
    ),
})

const CapTaiKhoan = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
  })
  return (
    <div className='w-full bg-[#E0F2FE] pt-8 px-2 pb-4 h-fit'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4'>
        <p className='text-black font-semibold text-2xl leading-8 mb-6 md:text-start text-center'>
          Danh sách tài khoản ADMIN
        </p>
        <div className='w-full flex items-center md:justify-end justify-center'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-sky-600 px-4 py-2 text-white hover:bg-sky-800'>
                Cấp tài khoản mới
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className='flex flex-row items-center justify-between'>
                <DialogTitle className='text-3xl'>Cấp tài khoản</DialogTitle>
                <DialogClose>
                  <X className='h-6 w-6 mb-2' />
                </DialogClose>
              </DialogHeader>
              <Form {...form}>
                <form>
                  <FormGroup
                    control={form.control}
                    label='Tên'
                    name='name'
                    placeholder='Họ và tên'
                    autoFocus
                    inputClassName='mb-4'
                  />
                  <FormGroup
                    control={form.control}
                    label='Số điện thoại'
                    name='phoneNumber'
                    placeholder='Số điện thoại'
                    inputClassName='mb-4'
                  />
                  <FormGroup
                    control={form.control}
                    label='Email'
                    name='Email'
                    type='email'
                    placeholder='Email'
                    inputClassName='mb-4'
                  />
                  <FormGroup
                    control={form.control}
                    label='Mật khẩu'
                    name='password'
                    placeholder='Mật khẩu'
                    type='password'
                  />
                </form>
              </Form>
              <DialogFooter>
                <Button className='bg-sky-600 px-4 py-2 text-white hover:bg-sky-800'>
                  Tạo tài khoản
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ListAdminTable listAdmin={listAdmin}></ListAdminTable>
      </div>
    </div>
  )
}

export default CapTaiKhoan
