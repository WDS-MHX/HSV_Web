'use client'

import { ResultPage } from '@/components/shared'
import { useState } from 'react'
import { POST_CATEGORY } from '@/configs/enum'
import { Pagination } from '@/types/pagination'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs/queryKeys'
import postApi from '@/apis/post'
import { SearchPostType } from '@/types/post'
import { useSearchParams } from 'next/navigation'

const TimKiemPage = () => {
  const searchParams = useSearchParams()
  const value = searchParams.get('value')

  const [searchValue, setSearchValue] = useState<string>(value || '')
  const [categrories, setCategrories] = useState<POST_CATEGORY[]>([
    POST_CATEGORY.GIOI_THIEU,
    POST_CATEGORY.SINH_VIEN_5_TOT,
    POST_CATEGORY.CAU_CHUYEN_DEP,
    POST_CATEGORY.TINH_NGUYEN,
    POST_CATEGORY.NCKH,
    POST_CATEGORY.HO_TRO_SINH_VIEN,
    POST_CATEGORY.XAY_DUNG_HOI,
  ])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 5 })
  const { data, refetch: searchPosts } = useQuery({
    queryKey: queryKeys.viewerSearchPosts.gen(
      pagination.page,
      pagination.limit,
      searchValue,
      categrories,
    ),
    queryFn: () =>
      postApi.searchPosts({
        page: pagination.page,
        limit: pagination.limit,
        title: searchValue,
        categrories,
      }),
    placeholderData: (previousData) => previousData,
  })

  const selectPage = (page: number) => {
    setPagination({ ...pagination, page: page })
  }

  const resetAndSearchPosts = () => {
    setPagination({ ...pagination, page: 1 })
    searchPosts()
  }

  const postResult: SearchPostType[] =
    data?.data.map((post) => ({
      id: post._id,
      categorized: post.categrory,
      title: post.title,
      description: post.description ?? '',
      content: post.content ?? '',
      img: post.titleImageId
        ? process.env.NEXT_PUBLIC_API_BASE_URL + '/file/download/' + post.titleImageId
        : undefined,
      date: post.postedDate,
    })) ?? []

  return (
    <div className='py-2 flex'>
      <ResultPage
        isAdmin={false}
        selectedCategories={categrories}
        setSelectedCategories={setCategrories}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchResults={postResult}
        itemsPerPage={pagination.limit}
        selectPage={selectPage}
        totalSearchItems={data?.pagination.total ?? 0}
        searchPosts={resetAndSearchPosts}
      />
    </div>
  )
}

export default TimKiemPage
