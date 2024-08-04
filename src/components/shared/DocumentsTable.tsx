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
import { PiDownloadSimpleBold, PiTrashBold } from 'react-icons/pi'
import React, { useEffect, useMemo, useState } from 'react'
import Pagination from './Pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './SelectOption'
import { MdOutlineFileUpload } from 'react-icons/md'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from './button'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from './dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import FormGroup from './form-group'
import FormTextAreaGroup from './form-textarea-group'
import { Document } from '@/models'
import { formatISOtime } from '@/helpers'
import { documentFilterOptions } from '@/configs/categoryFilters'
import { documentApi, fileApi } from '@/apis'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Input } from './input'
import DateFormGroup from './form-date-group'
import { RemoveAlert } from '../ui'
// const options: readonly { optionName: string }[] = [
//   {
//     optionName: 'Chương trình',
//   },
//   {
//     optionName: 'Công văn',
//   },
//   {
//     optionName: 'Hướng dẫn',
//   },
//   {
//     optionName: 'Kế hoạch',
//   },
//   {
//     optionName: 'Kế hoạch liên tịch',
//   },
//   {
//     optionName: 'Thông báo',
//   },
//   {
//     optionName: 'Thư mời',
//   },
// ]
const formSchema = z.object({
  docNumber: z.string().min(1, 'Vui lòng nhập Số/ Ký hiệu'),
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  categrory: z.string().min(1, 'Vui lòng chọn thể loại'),
  issueDate: z.date(),
  reference: z.string().min(1, 'Vui lòng nhập ký hiệu'),
  file:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files !== null && files.length > 0, 'Tài liệu không được để trống'),
})

export default function DocumentsTable({
  documents,
  isAdmin,
  reloadDocument,
}: {
  documents: Document[]
  isAdmin?: boolean
  reloadDocument?: any
}) {
  const queryClient = useQueryClient()
  const [openDialog, setOpenDialog] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docNumber: '',
      title: '',
      categrory: '',
    },
  })
  const fileRef = form.register('file')
  const createDocument = useMutation({
    mutationFn: documentApi.createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['createDocument'] })
      console.log('success')
      toast.success('Thêm document thành công!')
      form.reset()
      reloadDocument()
      setOpenDialog(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('VAOONSUBMIT', values.file)
    const dataJson = JSON.stringify({
      docNumber: Number(values.docNumber),
      title: values.title,
      categrory: values.categrory,
      reference: values.reference,
      issueDate: values.issueDate,
    })
    const data = {
      docJson: dataJson,
      file: values.file,
    }
    console.log('DATA', data)
    createDocument.mutate(data)
  }
  const downloadFile = async (id: string) => {
    const res = fileApi.downloadFile(id)
  }
  const deleteDocument = async (id: string) => {
    const res = await documentApi.deleteDocument(id)
    reloadDocument()
  }
  const [columnFilters, setColumnFilters] = useState<any>([])
  const [category, setCategory] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  console.log('columnfilter', columnFilters)
  const columnHelper = createColumnHelper<Document>()
  const [datalength, setDataLength] = useState<number>(documents.length)
  const searchInput = columnFilters.find((f: any) => f.id === 'title')?.value || ''
  const handleInput = (event: any) => {
    setQuery(event.target.value)
  }
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
  const columnDef = useMemo(() => {
    const columns = [
      columnHelper.accessor((row) => `${row.docNumber}`, {
        id: 'category',
        header: 'Số / kí hiệu',
        minSize: 70,
        maxSize: 70,
        cell: (info) => (
          <div className='flex items-center'>
            <span>{info.getValue()}/</span>
            <span>{info.cell.row.original.reference}</span>
          </div>
        ),
        filterFn: (row, columnId, filterCategory) => {
          const categoryRow = row.original.categrory
          console.log('filterCategoryFILTER', filterCategory)
          console.log('ROWFILTER', row)
          console.log('categoryRow', categoryRow)
          if (filterCategory == '') {
            return true
          }
          return filterCategory == categoryRow
        },
      }),
      columnHelper.accessor((row) => `${formatISOtime(row.issueDate)}`, {
        id: 'releaseDate',
        header: 'Ngày ban hành',
        size: 100,
        minSize: 100,
        maxSize: 100,
      }),
      columnHelper.accessor((row) => `${row.title}`, {
        id: 'title',
        header: 'Title',
        filterFn: 'includesString',
        size: 440,
        maxSize: 540,
      }),
      columnHelper.accessor((row) => `${row.mediaFileId}`, {
        id: 'Download',
        header: 'Download',
        minSize: 77,
        maxSize: 77,
        cell: (info) => (
          <Button
            onClick={() => downloadFile(info.getValue())}
            variant='outline'
            size='icon'
            className='rounded-full bg-white'
          >
            <PiDownloadSimpleBold size={16}></PiDownloadSimpleBold>
          </Button>
        ),
      }),
    ]
    if (isAdmin) {
      columns.push(
        columnHelper.accessor((row) => `${row._id}`, {
          id: 'Delete',
          enableHiding: true,
          header: 'Xóa',
          minSize: 77,
          maxSize: 77,
          cell: (info) => (
            <RemoveAlert
              title='Bạn có chắc chắn muốn xóa tài liệu này?'
              action={() => deleteDocument(info.getValue())}
            >
              <Button
                variant='outline'
                size='icon'
                className='rounded-full text-red-600 hover:text-red-600 bg-white'
              >
                <PiTrashBold size={16}></PiTrashBold>
              </Button>
            </RemoveAlert>
          ),
        }),
      )
    }
    return columns
  }, [])
  const finalData = React.useMemo(() => documents, [documents])
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
        pageSize: 10, //custom default page size
      },
    },
    columnResizeMode: 'onChange',
  })

  const onFilterCategoryChange = () => {
    setColumnFilters((prev: any) => {
      // let tempArr:any = []
      // const categorySelect = prev.find((filter: any) => filter.id === 'category')
      // if (!categorySelect) {
      //   tempArr = prev.concat({
      //     id: 'category',
      //     value: category,
      //   })
      //   console.log('tempArr', tempArr)
      // } else {
      //   tempArr = prev.map((f: any) =>
      //     f.id === 'category'
      //       ? {
      //           ...f,
      //           value: category,
      //         }
      //       : f,
      //   )
      // }
      console.log('EMPTY', '')
      const searchQuery = prev.find((filter: any) => filter.id === 'title')
      if (!searchQuery) {
        return prev.concat({
          id: 'title',
          value: query,
        })
      } else {
        return prev.map((f: any) =>
          f.id === 'title'
            ? {
                ...f,
                value: query,
              }
            : f,
        )
      }
    })
    // let getDataLengthFilter = tableInstance.getFilteredRowModel().rows.length;
    // setDataLength(getDataLengthFilter)
  }
  useEffect(() => {
    if (category != '') {
      setColumnFilters((prev: any) => {
        const categorySelect = prev.find((filter: any) => filter.id === 'category')?.value
        if (!categorySelect) {
          return prev.concat({
            id: 'category',
            value: category,
          })
        } else {
          return prev.map((f: any) =>
            f.id === 'category'
              ? {
                  ...f,
                  value: category,
                }
              : f,
          )
        }
      })
    }
  }, [category])
  useEffect(() => {
    setDataLength(tableInstance.getFilteredRowModel().rows.length)
  }, [tableInstance.getFilteredRowModel().rows.length, columnFilters, query, category])

  return (
    <div className='flex flex-col w-full md:justify-center md:items-center lg:items-start'>
      <div className='flex lg:flex-row flex-col items-center lg:justify-between w-full mb-4'>
        <div
          className={`flex md:flex-row flex-col items-center justify-between lg:w-[44.5rem] md:w-[39.375rem] w-full px-8 py-[0.625rem] ${isAdmin ? 'md:bg-slate-100' : 'lg:bg-slate-100'} rounded-md`}
        >
          <Select
            onValueChange={(value: string) => {
              setCategory(value)
            }}
          >
            <SelectTrigger className='md:w-auto w-full'>
              <SelectValue placeholder='Chọn danh mục'></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Chọn danh mục</SelectLabel>
                {documentFilterOptions.map((i) => (
                  <SelectItem key={i.key} value={i.key}>
                    {i.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='flex w-full items-center justify-between md:order-none -order-1 md:mb-0 mb-[0.625rem]'>
            <div className='border-[1px] border-slate-300 rounded-md w-full lg:mx-6 md:mx-2 mx-0'>
              <input
                className='border-none rounded-md mr-2 py-2 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
                placeholder='Gõ tên tài liệu vào đây'
                value={query}
                onChange={handleInput}
              ></input>
            </div>
            <button onClick={onFilterCategoryChange} className='button-primary md:ml-0 ml-2'>
              <p className='font-medium text-sm leading-6 text-white'>Tìm</p>
            </button>
          </div>
        </div>
        {isAdmin && (
          <div className='lg:mt-0 md:mt-[0.625rem] mt-0'>
            {/* <input type='file' id='file' className='hidden'></input>
            <label
              htmlFor='file'
              className='flex items-center py-2 px-4 justify-between bg-sky-600 rounded-lg font-medium text-sm text-white cursor-pointer hover:bg-sky-900 transition-all'
            >
              <MdOutlineFileUpload className='text-xl mr-1' />
              Upload tài liệu
            </label> */}
            <Dialog
              open={openDialog}
              onOpenChange={() => {
                form.reset()
                setOpenDialog(!openDialog)
              }}
            >
              <DialogTrigger asChild>
                <Button className='flex items-center py-2 px-4 justify-between bg-sky-600 rounded-lg font-medium text-sm text-white cursor-pointer hover:bg-sky-900 transition-all'>
                  <MdOutlineFileUpload className='text-xl mr-1' />
                  Upload tài liệu
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className='flex flex-row items-center justify-between'>
                  <DialogTitle className='text-2xl'>Upload tài liệu</DialogTitle>
                  <DialogClose>
                    <X className='h-6 w-6 mb-2' />
                  </DialogClose>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormGroup
                      control={form.control}
                      label='Số / Ký hiệu'
                      name='docNumber'
                      placeholder='Nhập Số /Ký hiệu'
                      autoFocus
                      inputClassName='text-base font-normal text-placeHolder'
                    />
                    <FormTextAreaGroup
                      control={form.control}
                      label='Title'
                      name='title'
                      inputClassName='resize-none text-base font-normal text-placeHolder'
                      placeholder='Nhập title'
                    />
                    <div className='flex w-full items-center justify-between gap-2 mt-4 mb-4'>
                      <FormGroup
                        control={form.control}
                        label='Ký hiệu'
                        name='reference'
                        placeholder='Nhập Ký hiệu'
                        inputClassName='text-base font-normal text-placeHolder'
                      />
                      <DateFormGroup
                        control={form.control}
                        label='Ngày phát hành'
                        name='issueDate'
                        placeholder='Nhập ngày phát'
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name='categrory'
                      render={({ field }) => (
                        <FormItem className='w-full mb-4'>
                          <FormLabel className='text-sm font-medium text-black'>Danh mục</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <div className='flex space-x-3 w-full'>
                                <SelectTrigger className='bg-white !w-full h-10 text-base text-placeHolder !font-normal border-slate-300 border-[1.5px] rounded-md !cursor-pointer '>
                                  <SelectValue placeholder='Chọn danh mục' />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              {documentFilterOptions.map((i) => (
                                <SelectItem key={i.key} value={i.key}>
                                  {i.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormGroup
                    control={form.control}
                    label='File'
                    name='file'
                    type='file'
                    inputClassName='mb-4 text-base font-normal text-placeHolder placeholder:text-base cursor-pointer'
                    /> */}
                    <FormField
                      control={form.control}
                      name='file'
                      render={({ field, fieldState }) => (
                        <FormItem className='w-full'>
                          <FormLabel className='text-sm font-medium text-black'>file</FormLabel>
                          <FormControl>
                            <Input
                              className=' text-base font-normal text-placeHolder placeholder:text-base cursor-pointer'
                              type='file'
                              {...fileRef}
                            ></Input>
                          </FormControl>
                          {fieldState.error && (
                            <p className='text-red-600 text-sm'>{fieldState.error.message}</p>
                          )}
                        </FormItem>
                      )}
                    />
                    <DialogFooter className='mt-4'>
                      <Button
                        type='submit'
                        className='bg-sky-600 px-4 py-2 text-white hover:bg-sky-800'
                      >
                        Upload
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <table className='h-full w-full border-collapse font-Manrope mb-4 overflow-x-auto'>
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
                      md:text-sm sticky md:top-0 top-0 bg-sky-600 leading-6 text-white border-2 p-4 text-left font-bold text-xs`}
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
              <tr key={row.id} className='table-row'>
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
        <Pagination itemsPerPage={10} table={tableInstance} notilength={datalength}></Pagination>
      </div>
    </div>
  )
}
