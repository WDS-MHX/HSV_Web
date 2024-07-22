'use client'
import {
  createColumnHelper,
  useReactTable,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from './dialog'
import { Form } from './form'
import FormGroup from './form-group'
import { Button } from './button'
import React, { useMemo, useState } from 'react'
import Pagination from './Pagination'
import { Admin } from '@/models'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
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

export default function ListAdminTable({ listAdmin }: { listAdmin: Admin[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
  })
  const [columnFilters, setColumnFilters] = useState<any>([])
  const columnHelper = createColumnHelper<Admin>()
  const datalength = listAdmin.length
  const onFilterChange = (id: any, value: any) =>
    setColumnFilters((prev: any) =>
      prev
        .filter((f: any) => f.id !== id)
        .concat({
          id,
          value,
        }),
    )
  // eslint-disable-next-line
  const columnDef = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.email}`, {
        id: 'email',
        header: 'Email',
        minSize: 70,
        maxSize: 70,
      }),
      columnHelper.accessor((row) => `${row.name}`, {
        id: 'name',
        header: 'Tên',
        size: 100,
        minSize: 100,
        maxSize: 100,
      }),
      columnHelper.accessor((row) => `${row.phoneNumber}`, {
        id: 'phoneNumber',
        header: 'Số điện thoại',
        size: 440,
        maxSize: 540,
      }),
      columnHelper.accessor((row) => `${row}`, {
        id: 'Action',
        header: '',
        minSize: 77,
        maxSize: 77,
        cell: (info) => (
          <div className='w-full flex items-center justify-center'>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-slate-100 px-4 py-2 text-black hover:bg-slate-200 md:text-sm text-xs'>
                  Cập nhật
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className='flex flex-row items-center justify-between'>
                  <DialogTitle className='text-3xl'>Cập nhật tài khoản</DialogTitle>
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
                    Cập nhật
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ),
      }),
    ],
    [],
  )
  const finalData = React.useMemo(() => listAdmin, [listAdmin])
  const tableInstance = useReactTable({
    columns: columnDef,
    data: finalData,
    state: {
      columnFilters,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 5, //custom default page size
      },
    },
    columnResizeMode: 'onChange',
  })
  return (
    <div className='flex flex-col w-full md:justify-center md:items-center lg:items-start'>
      <div className='flex lg:flex-row flex-col items-center lg:justify-between w-full mb-4'></div>
      <table className='h-full w-full border-collapse font-Manrope mb-4'>
        <thead>
          {tableInstance.getHeaderGroups().map((header) => {
            return (
              <tr className='sticky z-10 h-fit' key={header.id}>
                {header.headers.map((column) => {
                  console.log(column.column.columnDef.header, column.column.columnDef.size)
                  return (
                    <th
                      className={`${
                        column.column.columnDef.id == 'id'
                          ? 'lg:w-auto md:w-[6.875rem] w-[4.375rem]'
                          : column.column.columnDef.id == 'releaseDate'
                            ? 'lg:w-[18.5rem] md:w-[10.813rem] w-[5.938rem]'
                            : column.column.columnDef.id == 'title'
                              ? 'lg:w-[27.5rem] w-auto'
                              : 'lg:w-[12rem] md:w-[6.5rem] w-[4.813rem]'
                      } 
                      md:text-sm sticky lg:top-0 md:top-14 top-0 bg-white leading-6 text-slate-900 border-2 p-4 text-left font-bold text-xs`}
                      key={column.id}
                      colSpan={column.colSpan}
                      // style={{
                      //   width: column.column.columnDef.size,
                      //   minWidth: column.column.columnDef.minSize,
                      //   maxWidth: column.column.columnDef.maxSize,
                      // }}
                    >
                      {flexRender(column.column.columnDef.header, column.getContext())}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className='p-4 border-2 md:text-sm leading-6 text-slate-900 font-normal text-xs'
                      key={cell.id}
                      // style={{
                      //   width: cell.column.columnDef.size,
                      //   minWidth: cell.column.columnDef.minSize,
                      //   maxWidth: cell.column.columnDef.maxSize,
                      // }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='w-full justify-center'>
        <Pagination itemsPerPage={5} table={tableInstance} notilength={datalength}></Pagination>
      </div>
    </div>
  )
}
