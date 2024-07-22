'use client'
import DocumentsTable from '@/components/shared/DocumentsTable'
import { Document } from '@/models'
import { useMutation, useQuery } from '@tanstack/react-query'
import { documentApi } from '@/apis'
import { useState } from 'react'
import InputFileUpload from '@/components/shared/uploadBtn'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Filter from '@/components/shared/Filter'
import { SearchDocumentDTO } from '@/apis'

import { DOCUMENT_PAGE_LIMIT_DEFAULT, documentFilterOptions } from '@/configs'
const QuanLyTaiLieu = () => {

  //use state
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<string>("")
  const [searchInput, setSearchInput] = useState<string>("")
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const [isSearch, setIsSearch] = useState<boolean>(false)

  //use query
  const getAllDocmentsQuery = useQuery({
    queryKey: ['documents', currentPage],
    queryFn: () => {
      return documentApi.getAllDocuments(currentPage);
    }
  })
  //use mutation
  const filterMutation = useMutation({
    mutationFn: ({ category, page, limit }: { category: string, page: number, limit: number }) => {
      const searchDocumentDTO: SearchDocumentDTO = {
        title: "",
        categrory: category,
        page: page,
        limit: limit
      }
      return documentApi.searchDocument(searchDocumentDTO);
    },
    onSuccess: (data) => {
      setIsFilter(true)
    }
  })
  const searchMutation = useMutation({
    mutationFn: ({ title, categrory, page, limit }: SearchDocumentDTO) => {
      const searchDocumentDTO: SearchDocumentDTO = {
        title: title,
        categrory: categrory,
        page: page,
        limit: limit
      }
      return documentApi.searchDocument(searchDocumentDTO);
    },
    onSuccess: (data) => {
      setIsSearch(true)
    }
  })
  return (
    <div className='w-full bg-[#E0F2FE] pt-8 px-2 pb-4 h-fit'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4'>
        <div className='flex lg:flex-row flex-col items-center lg:justify-between w-full mb-4'>
          <div
            className={`flex md:flex-row flex-col items-center justify-between gap-[24px] lg:w-[44.5rem] md:w-[39.375rem] lg:px-8 px-[16px] w-full px-8 py-[0.625rem] 'lg:bg-slate-100' rounded-md`}
          >
            <Filter data={documentFilterOptions} onChange={(v: string) => {
              setIsSearch(false)

              if (v == "ALL") {
                setFilter("")
                setIsFilter(false)
                return;
              }
              setFilter(v)
              filterMutation.mutate({ category: v, page: 1, limit: DOCUMENT_PAGE_LIMIT_DEFAULT })
            }} />
            <div className='flex flex-1 items-center justify-between md:order-none -order-1 gap-[16px]'>
              <Input
                className=''
                placeholder='Gõ tên tài liệu vào đây'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}></Input>
              <Button
                className='bg-sky-900'
                onClick={() => {
                  setIsFilter(false)
                  searchMutation.mutate({ title: searchInput, categrory: filter, page: 1, limit: DOCUMENT_PAGE_LIMIT_DEFAULT })
                }}
              >Tìm</Button>
            </div>
          </div>
          <div className='lg:mt-0 md:mt-[0.625rem] mt-0'>
            <InputFileUpload></InputFileUpload>
          </div>
        </div>
        {getAllDocmentsQuery.isPending || filterMutation.isPending || searchMutation.isPending ? (
          <div>
            Loading...
          </div>
        ) : (
          isFilter ?
            (
              filterMutation.data === undefined ? <></> :
                <DocumentsTable documents={filterMutation.data?.data}></DocumentsTable>
            ) :
            (
              isSearch ?
                (
                  searchMutation.data === undefined ? <></> :
                    <DocumentsTable documents={searchMutation.data?.data}></DocumentsTable>
                )
                :
                (
                  getAllDocmentsQuery.data === undefined ? <></> :
                    <DocumentsTable documents={getAllDocmentsQuery.data?.data}></DocumentsTable>
                )
            )
        )
        }
      </div>
    </div>
  )
}

export default QuanLyTaiLieu
