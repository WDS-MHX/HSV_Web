import DocumentsTable from '@/components/shared/DocumentsTable'
import React from 'react'
import { documents } from '@/app/(main-layout)/he-thong-van-ban/data'
const QuanLyTaiLieu = () => {
  return (
    <div className='w-full bg-[#E0F2FE] pt-8 px-2 pb-4 h-fit'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4'>
        <DocumentsTable documents={documents} isAdmin={true}></DocumentsTable>
      </div>
    </div>
  )
}

export default QuanLyTaiLieu
