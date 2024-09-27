'use client'
import DocumentsTable from '@/components/shared/DocumentsTable'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { documentApi } from '@/apis'
import { timeoutMsg } from '@/configs'
const QuanLyTaiLieu = () => {
  const { data: getAllDocmentsQuery, refetch: reloadDocument } = useQuery({
    queryKey: ['documents'],
    queryFn: () => documentApi.getAllDocuments(),
    refetchInterval: (query) => {
      const currentStatus = query.state?.data
      if (currentStatus) {
        return false
      }
      return 300000 // 5 minutes
    },
    retry: (failureCount, error) => failureCount < 3 && error.message === timeoutMsg,
    retryDelay: 1000,
  })
  return (
    <div className='w-full lg:bg-sky-600 bg-white lg:pt-8 lg:px-2 px-0 pt-0 pb-4 h-fit'>
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
