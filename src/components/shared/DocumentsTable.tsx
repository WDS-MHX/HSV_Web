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
import { PiDownloadSimpleBold } from 'react-icons/pi'
import React, { useMemo, useState } from 'react'
import documentType from '@/models/document'
import Pagination from './Pagination'
// import SelectOption from '@/app/(main-layout)/he-thong-van-ban/components/SelectOption/SelectOption'
import SelectOption from './SelectOption'
import InputFileUpload from './uploadBtn'
export default function DocumentsTable({
  documents,
  isAdmin,
}: {
  documents: documentType[]
  isAdmin: boolean
}) {
  const [columnFilters, setColumnFilters] = useState<any>([])
  const columnHelper = createColumnHelper<documentType>()
  const datalength = documents.length
  const searchInput = columnFilters.find((f: any) => f.id === 'title')?.value || ''
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
      columnHelper.accessor((row) => `${row.id}`, {
        id: 'id',
        header: 'Số / kí hiệu',
        minSize: 70,
        maxSize: 70,
      }),
      columnHelper.accessor((row) => `${row.releaseDate}`, {
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
      columnHelper.accessor((row) => `${row.id}`, {
        id: 'Download',
        header: 'Download',
        minSize: 77,
        maxSize: 77,
        cell: (info) => (
          <div className='rounded-full cursor-pointer mx-auto w-fit p-3 border-[1px] border-slate-200'>
            <PiDownloadSimpleBold size={16}></PiDownloadSimpleBold>
          </div>
        ),
      }),
    ],
    [],
  )
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
  return (
    <div className='flex flex-col w-full md:justify-center md:items-center lg:items-start'>
      <div className='flex lg:flex-row flex-col items-center lg:justify-between w-full mb-4'>
        <div
          className={`flex md:flex-row flex-col items-center justify-between lg:w-[44.5rem] md:w-[39.375rem] w-full px-8 py-[0.625rem] ${isAdmin ? 'md:bg-slate-100' : 'lg:bg-slate-100'} rounded-md`}
        >
          <SelectOption className='lg:block md:w-auto w-full' isDocument={true}></SelectOption>
          <div className='flex w-full items-center justify-between md:order-none -order-1 md:mb-0 mb-[0.625rem]'>
            <div className='border-[1px] border-slate-300 rounded-md w-full lg:mx-6 md:mx-2 mx-0'>
              <input
                className='border-none rounded-md mr-2 py-2 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
                placeholder='Gõ tên tài liệu vào đây'
                value={searchInput}
                onChange={(e) => onFilterChange('title', e.target.value)}
              ></input>
            </div>
            <button className='button-primary md:ml-0 ml-2'>
              <p className='font-medium text-sm leading-6 text-white'>Tìm</p>
            </button>
          </div>
        </div>
        {isAdmin && (
          <div className='lg:mt-0 md:mt-[0.625rem] mt-0'>
            <InputFileUpload></InputFileUpload>
          </div>
        )}
      </div>
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
        <Pagination itemsPerPage={10} table={tableInstance} notilength={datalength}></Pagination>
      </div>
    </div>
  )
}
