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
import { Document } from '@/models'
import Pagination from './Pagination'
// import SelectOption from '@/app/(main-layout)/he-thong-van-ban/components/SelectOption/SelectOption'
import { fileApi } from '@/apis'
import { DOCUMENT_PAGE_LIMIT_DEFAULT } from '@/configs'
import { Button } from '@/components/ui/button'
import { formatISOtime } from '@/helpers'


export default function DocumentsTable({
  documents
}: {
  documents: Document[]
}) {
  const downloadFile = async (id: string) => {
    const res = fileApi.downloadFile(id)
  };

  const columnHelper = createColumnHelper<Document>()
  const datalength = documents.length

  // eslint-disable-next-line
  const columnDef = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.docNumber}`, {
        id: 'id',
        header: 'Số / kí hiệu',
        minSize: 70,
        maxSize: 70,
      }),
      columnHelper.accessor((row) => `${formatISOtime(row.issueDate)}`, {
        id: 'issueDate',
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
            variant="outline"
            size="icon"
            onClick={() => downloadFile(info.getValue())}
          >
            <PiDownloadSimpleBold size={16} />
          </Button>
        ),
      }),
    ],
    [],
  )
  const finalData = React.useMemo(() => documents, [documents])
  const tableInstance = useReactTable({
    columns: columnDef,
    data: finalData,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: DOCUMENT_PAGE_LIMIT_DEFAULT, //custom default page size
      },
    },
    columnResizeMode: 'onChange',
  })
  return (
    <div className='flex flex-col w-full md:justify-center md:items-center lg:items-start'>
      <table className='h-full w-full border-collapse font-Manrope mb-4'>
        <thead>
          {tableInstance.getHeaderGroups().map((header) => {
            return (
              <tr className='sticky z-10 h-fit' key={header.id}>
                {header.headers.map((column) => {
                  console.log(column.column.columnDef.header, column.column.columnDef.size)
                  return (
                    <th
                      className={`${column.column.columnDef.id == 'id'
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
