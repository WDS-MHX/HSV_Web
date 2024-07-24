'use client'
import DocumentsTable from '@/components/shared/DocumentsTable'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { documentApi } from '@/apis'
const QuanLyTaiLieu = () => {
  const { data: getAllDocmentsQuery, refetch: reloadDocument } = useQuery({
    queryKey: ['documentsByAdmin'],
    queryFn: () => documentApi.getAllDocumentsUploadedByAdmin(),
    refetchInterval: (query) => {
      const currentStatus = query.state?.data
      if (currentStatus) {
        return false
      }
      return 300000 // 5 minutes
    },
  })
  return (
    <div className='w-full bg-[#E0F2FE] pt-8 px-2 pb-4 h-fit'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4'>
        {!getAllDocmentsQuery ? (
          <></>
        ) : (
          <DocumentsTable
            documents={getAllDocmentsQuery.data}
            isAdmin={true}
            reloadDocument={reloadDocument}
          ></DocumentsTable>
        )}
      </div>
    </div>
  )
}

export default QuanLyTaiLieu
