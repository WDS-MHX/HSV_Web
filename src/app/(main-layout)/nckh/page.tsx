'use client'

import { PostReview } from '@/components'
import { shortenText } from '@/helpers'
import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs/queryKeys'
import postApi from '@/apis/post'
import { PostReviewType } from '@/types/post'
import { POST_CATEGORY } from '@/configs/enum'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { PATH_NAME, timeoutMsg } from '@/configs'

export default function NCKH() {
  const router = useRouter()
  const itemsPerPage = 4

  const [value, setValue] = useState<string>('')
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: queryKeys.allPosts.gen(POST_CATEGORY.NCKH),
    queryFn: ({ pageParam }) =>
      postApi.getAllPostsByCategory(pageParam, itemsPerPage, POST_CATEGORY.NCKH),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.floor((lastPage?.pagination.total ?? 0) / itemsPerPage) + 1
      const actualPage = Number(lastPage?.pagination.currentPage ?? 0)
      return actualPage < totalPages ? actualPage + 1 : undefined
    },
    retry: (failureCount, error) => failureCount < 3 && error.message === timeoutMsg,
    retryDelay: 1000,
  })

  const postResult: PostReviewType[] = []
  data?.pages.forEach((post) => {
    post?.data.forEach((item) => {
      postResult.push({
        id: item._id,
        categorized: item.categrory,
        title: item.title,
        description: item.description ?? '',
        content: item.content ?? '',
        img: item.titleImageId
          ? process.env.NEXT_PUBLIC_API_BASE_URL + '/file/download/' + item.titleImageId
          : undefined,
        date: item.postedDate,
      })
    })
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = useCallback(() => {
    router.push(`${PATH_NAME.TIM_KIEM}?value=${value}`)
  }, [router, value])

  return (
    <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-1'>
      <div className='w-full lg:col-span-3 md:col-span-1'>
        <div className='flex items-center py-[0.625rem] lg:hidden md:mx-[3.438rem] mx-4 my-4'>
          <div className='border-2 rounded-md mr-2 p-0.5 w-full'>
            <input
              id='search-bar'
              className='border-none w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
              value={value}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            ></input>
          </div>
          <button className='w-[5.625rem] button-primary' onClick={handleSubmit}>
            Tìm
          </button>
        </div>

        <div className='flex flex-col mt-6'>
          {postResult.map((post) => (
            <PostReview
              key={post.id}
              id={post.id}
              img={post.img}
              categorized={post.categorized}
              title={post.title}
              content={shortenText(post.content, 50)}
              date={post.date}
              description={post.description}
            />
          ))}
          <div className='flex justify-center items-center w-full'>
            {data && hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className='flex items-center bg-sky-800 text-white px-4 py-2 rounded-lg font-medium text-sm leading-6'
              >
                {isFetchingNextPage ? 'Đang tải ...' : 'Xem thêm ...'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:block max-lg:hidden'>
        <div className='flex items-center py-[0.625rem]'>
          <div className='border-[1px] border-slate-300 rounded-md w-full ml-0 mr-2'>
            <input
              id='search-bar'
              className='border-none rounded-md mr-2 py-2 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
              value={value}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            ></input>
          </div>
          <button className='button-primary' onClick={handleSubmit}>
            Tìm
          </button>
        </div>
      </div>
    </div>
  )
}
