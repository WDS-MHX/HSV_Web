'use client'

import { PostReview } from '@/components'
import { shortenText } from '@/helpers'
import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs/queryKeys'
import postApi from '@/apis/post'
import { PostReviewType } from '@/types/post-review'
import { POST_CATEGORY } from '@/configs/enum'

export default function TinhNguyen() {
  const { data, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: queryKeys.allPosts.gen(),
    queryFn: ({ pageParam }) =>
      postApi.getAllPostsByCategory(pageParam, 4, POST_CATEGORY.TINH_NGUYEN),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.floor(lastPage?.pagination.total ?? 0 / 4)
      const actualPage = lastPage?.pagination.currentPage ?? 0
      return actualPage < totalPages ? actualPage + 1 : undefined
    },
  })

  const postResult: PostReviewType[] = []
  data?.pages.forEach((post) => {
    post?.data.forEach((item) => {
      postResult.push({
        id: item._id,
        categorized: item.categrory,
        title: item.title,
        content: item.content ?? '',
        img: item.titleImageId
          ? process.env.NEXT_PUBLIC_API_BASE_URL + '/download/' + item.titleImageId
          : undefined,
        date: item.postedDate,
      })
    })
  })

  return (
    <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-1'>
      <div className='w-full lg:col-span-3 md:col-span-1'>
        <div className='flex items-center py-[0.625rem] lg:hidden md:mx-[3.438rem] mx-4 my-4'>
          <div className='border-2 rounded-md mr-2 p-0.5 w-full'>
            <input
              className='border-none w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
            ></input>
          </div>
          <button className='w-[5.625rem] button-primary'>Tìm</button>
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
            />
          ))}
          <div className='flex justify-center items-center w-full'>
            {hasNextPage && (
              <button className='flex items-center bg-sky-800 text-white px-4 py-2 rounded-lg font-medium text-sm leading-6'>
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
              className='border-none rounded-md mr-2 py-2 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
            ></input>
          </div>
          <button className='button-primary'>Tìm</button>
        </div>
      </div>
    </div>
  )
}
