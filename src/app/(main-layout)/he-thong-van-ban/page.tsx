'use client'
import DocumentsTable from '@/components/shared/DocumentsTable'
import { documents } from './data'
import { documentApi } from '@/apis'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { timeoutMsg } from '@/configs'
export default function Hethongvanban() {
  const getAllDocmentsQuery = useQuery({
    queryKey: ['documents'],
    queryFn: () => {
      return documentApi.getAllDocuments()
    },
    retry: (failureCount, error) => failureCount < 3 && error.message === timeoutMsg,
    retryDelay: 1000,
  })
  return (
    <div className='my-4'>
      {getAllDocmentsQuery.data === undefined ? (
        <></>
      ) : (
        <DocumentsTable documents={getAllDocmentsQuery.data?.data}></DocumentsTable>
      )}
    </div>
  )
}
