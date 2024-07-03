'use client'
import {
  createColumnHelper,
  useReactTable,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import Image from 'next/image'
import { PiDownloadSimpleBold } from 'react-icons/pi'
import React, { useMemo } from 'react'
import { documents } from './data'
interface documentType {
  id?: number
  releaseDate?: string
  title?: string
}
export default function DocumentsTable() {
  const columnHelper = createColumnHelper<documentType>()
  // eslint-disable-next-line
  const columnDef = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.id}`, {
        id: 'id',
        header: 'Số / kí hiệu',
      }),
      columnHelper.accessor((row) => `${row.releaseDate}`, {
        id: 'releaseDate',
        header: 'Ngày ban hành',
      }),
      columnHelper.accessor((row) => `${row.title}`, {
        id: 'title',
        header: 'title',
      }),
      columnHelper.accessor((row) => `${row.id}`, {
        id: 'Download',
        header: 'Download',
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
    // state: {
    //   columnFilters,
    // },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: 'onChange',
  })
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='border-2 rounded-md mr-2 py-2 px-3 w-full'>
          <input
            className='border-none w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
            placeholder='Search'
          ></input>
        </div>
      </div>
      <table className='h-full w-full border-collapse font-Manrope'>
        <thead>
          {tableInstance.getHeaderGroups().map((header) => {
            return (
              <tr className='sticky z-10 h-fit' key={header.id}>
                {header.headers.map((column) => {
                  return (
                    <th
                      className='text-sm sticky leading-6 text-slate-900 border-2 p-4 text-left font-bold'
                      key={column.id}
                      colSpan={column.colSpan}
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
                      className='p-4 border-2 text-sm leading-6 text-slate-900 font-normal'
                      key={cell.id}
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
    </div>
  )
}
