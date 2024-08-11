'use client'

import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import { IoChevronForwardOutline } from 'react-icons/io5'
import { IoChevronBackOutline } from 'react-icons/io5'
import documentType from '@/models/document'
import { Table } from '@tanstack/react-table'
import { Admin } from '@/models'
import { number } from 'zod'

interface PaginationType {
  itemsPerPage: number
  setItemOffset?: (offset: number) => void | undefined
  notilength: number
  table?: Table<documentType> | Table<Admin> | undefined
  setPreviousPage?: (offset: number) => void
  checkFiltered?: number | undefined
  setCheckFiltered?: (offset: number | undefined) => void
}

function Pagination({
  itemsPerPage,
  setItemOffset,
  notilength,
  table,
  setPreviousPage,
  checkFiltered,
  setCheckFiltered,
}: PaginationType) {
  const [forcePage, setForcePage] = useState<number | undefined>(checkFiltered)
  let pageCount = Math.ceil(notilength / itemsPerPage)
  console.log('PAGECOUNT', notilength, itemsPerPage, pageCount)
  const handlePageClick = (event: { selected: number }) => {
    if (table) {
      table.setPageIndex(event.selected)
      if (setPreviousPage) {
        setPreviousPage(event.selected)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (setItemOffset) {
      const newOffset = (event.selected * itemsPerPage) % notilength
      setItemOffset(newOffset)

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (setCheckFiltered) setCheckFiltered(undefined)
  }
  useEffect(() => {
    setForcePage(checkFiltered)
  }, [checkFiltered])
  return (
    <div>
      <ReactPaginate
        forcePage={forcePage}
        previousLabel={
          <div className='flex items-center justify-center py-[0.625rem] px-4 hover:bg-slate-100 focus:bg-slate-100'>
            <IoChevronBackOutline className='text-black mr-[0.625rem]' />
            <span className='text-black text-sm'>Previous</span>
          </div>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        breakLabel='...'
        pageCount={pageCount}
        nextLabel={
          <div className='flex items-center justify-center py-[0.625rem] px-4 hover:bg-slate-100 focus:bg-slate-100'>
            <span className='text-black text-sm mr-[0.625rem]'>Next</span>
            <IoChevronForwardOutline className='text-black' />
          </div>
        }
        renderOnZeroPageCount={null}
        breakClassName='flex w-7 block decoration-0 h-[2.5rem] w-[2.5rem] mr-1 list-none items-center text-black justify-center rounded-md bg-white text-sm hover:bg-slate-100'
        pageLinkClassName='flex w-7 block decoration-0 h-[2.5rem] w-[2.5rem] mr-1 list-none items-center text-black justify-center rounded-md bg-white text-sm hover:bg-slate-100'
        containerClassName='items-center flex justify-center mb-3'
        activeLinkClassName='border-2 border-slate-200 decoration-0 list-none'
      />
    </div>
  )
}

export default Pagination
