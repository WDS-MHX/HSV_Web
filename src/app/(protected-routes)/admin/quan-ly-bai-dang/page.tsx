'use client'

import { StaticImageData } from 'next/image'
import { ResultPage } from '@/components/shared'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs/queryKeys'
import { FaPlus } from 'react-icons/fa6'
import { FiPlus } from 'react-icons/fi'
import { Pagination } from '@/types/pagination'
import postApi from '@/apis/post'
import { POST_CATEGORY } from '@/configs/enum'

interface SearchData {
  id: string
  categorized: POST_CATEGORY
  title: string
  content: string
  img?: Array<string>
  date: string
}

// const searchValue: string = ''

// const data: searchData[] = [
//   {
//     id: '1',
//     categorized: 'Xây dựng hội',
//     title:
//       'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
//     content:
//       'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
//     img: ['/assets/images/content_img.svg'],
//     comment: 1,
//     date: '21/02/2023',
//   },
//   {
//     id: '2',
//     categorized: 'Xây dựng hội',
//     title:
//       'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
//     content:
//       'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
//     img: ['/assets/images/content_img.svg'],
//     comment: 1,
//     date: '21/02/2023',
//   },
//   {
//     id: '2',
//     categorized: 'Xây dựng hội',
//     title:
//       'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
//     content:
//       'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
//     img: ['/assets/images/content_img.svg'],
//     comment: 1,
//     date: '21/02/2023',
//   },
//   {
//     id: '2',
//     categorized: 'Xây dựng hội',
//     title:
//       'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
//     content:
//       'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
//     img: ['/assets/images/content_img.svg'],
//     comment: 1,
//     date: '21/02/2023',
//   },
//   {
//     id: '2',
//     categorized: 'Xây dựng hội',
//     title:
//       'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
//     content:
//       'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
//     img: ['/assets/images/content_img.svg'],
//     comment: 1,
//     date: '21/02/2023',
//   },
//   {
//     id: '2',
//     categorized: 'Xây dựng hội',
//     title:
//       'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
//     content:
//       'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
//     img: ['/assets/images/content_img.svg'],
//     comment: 1,
//     date: '21/02/2023',
//   },
//   {
//     id: '2',
//     categorized: 'Xây dựng hội',
//     title:
//       'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
//     content:
//       'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
//     img: ['/assets/images/content_img.svg'],
//     comment: 1,
//     date: '21/02/2023',
//   },
// ]

const PostTabs = ({
  isPosted,
  handleIsOpen,
  handleNotIsOpen,
  className,
}: {
  isPosted: boolean
  handleIsOpen: () => void
  handleNotIsOpen: () => void
  className?: string
}) => {
  return (
    <div className={`p-1.5 flex bg-background w-fit rounded-md ${className}`}>
      <div
        className={`cursor-pointer duration-300 transition-colors ${isPosted ? 'text-primary font-semibold bg-white' : 'text-[#334155]'} px-3 py-1.5 rounded-[3px]`}
        onClick={handleIsOpen}
      >
        Đã đăng
      </div>
      <div
        className={`cursor-pointer duration-300 transition-colors ${!isPosted ? 'text-primary font-semibold bg-white' : 'text-[#334155]'} px-3 py-1.5 rounded-[3px]`}
        onClick={handleNotIsOpen}
      >
        Chưa đăng
      </div>
    </div>
  )
}

const Quanlybaidang = () => {
  const [isPosted, setIsPosted] = useState<boolean>(true)

  const handleIsOpen = () => {
    setIsPosted(true)
  }

  const handleNotIsOpen = () => {
    setIsPosted(false)
  }

  const [searchValue, setSearchValue] = useState<string>('')
  const [categrories, setCategrories] = useState<POST_CATEGORY[]>([
    POST_CATEGORY.SINH_VIEN_5_TOT,
    POST_CATEGORY.CAU_CHUYEN_DEP,
    POST_CATEGORY.TINH_NGUYEN,
    POST_CATEGORY.NCKH,
    POST_CATEGORY.HO_TRO_SINH_VIEN,
    POST_CATEGORY.XAY_DUNG_HOI,
  ])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 5 })
  const { data } = useQuery({
    queryKey: queryKeys.adminSearchPosts.gen(
      pagination.page,
      pagination.limit,
      searchValue,
      categrories,
      isPosted,
    ),
    queryFn: () =>
      postApi.searchPostsForAdmin({
        page: pagination.page,
        limit: pagination.limit,
        showPost: isPosted,
        title: searchValue,
        categrories,
      }),
    placeholderData: (previousData) => previousData,
  })

  const selectPage = (page: number) => {
    setPagination({ ...pagination, page: page })
  }

  const postResult =
    data?.data.map((post) => ({
      id: post._id,
      categorized: post.categrory,
      title: post.title,
      content: post.content ?? '',
      img: post.titleImageId
        ? process.env.NEXT_PUBLIC_API_BASE_URL + '/download/' + post.titleImageId
        : undefined,
      date: post.postedDate,
    })) ?? []

  return (
    <div className='w-full bg-[#E0F2FE] lg:pt-8 px-2 pb-4 h-fit'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4'>
        <div className='flex w-full justify-between pr-8 h-fit md:mb-6 items-center'>
          <PostTabs
            isPosted={isPosted}
            handleIsOpen={handleIsOpen}
            handleNotIsOpen={handleNotIsOpen}
            className='max-md:hidden'
          />
          <button className='py-2.5 px-8 rounded-md text-white font-medium bg-sky-600 h-full max-md:hidden'>
            Tạo bài viết mới
          </button>
        </div>
        <ResultPage
          isAdmin={true}
          selectedCategories={categrories}
          setSelectedCategories={setCategrories}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchResults={postResult}
          itemsPerPage={pagination.limit}
          selectPage={selectPage}
          totalSearchItems={data?.pagination.total ?? 0}
        />

        {/* 
          Tạo bài viết mới button and Đã đăng & Chưa đăng post tabs in mobile
         */}
        <div className='group fixed right-4 bottom-[92px] p-4 rounded-full bg-white hover:bg-sky-600 border border-sky-600 shadow-[0px_2px_20px_0px_rgba(2,132,199,0.3)] cursor-pointer md:hidden'>
          <FiPlus className='text-sky-600 group-hover:text-white text-[32px]' />
        </div>
        <PostTabs
          isPosted={isPosted}
          handleIsOpen={handleIsOpen}
          handleNotIsOpen={handleNotIsOpen}
          className='fixed bottom-[23px] left-1/2 -translate-x-1/2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)] md:hidden'
        />
      </div>
    </div>
  )
}

export default Quanlybaidang
