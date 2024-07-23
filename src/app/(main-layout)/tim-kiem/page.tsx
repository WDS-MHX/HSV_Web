import { ResultPage } from '@/components/shared'
import { picturePlaceHolder } from '../../../../public'
import { StaticImageData } from 'next/image'
import content_img from '/assets/images/content_img.png'
import { useState } from 'react'
import { POST_CATEGORY } from '@/configs/enum'
import { Pagination } from '@/types/pagination'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs/queryKeys'
import postApi from '@/apis/post'
import { SearchPostType } from '@/types/post'

interface searchData {
  id: string
  categorized: string
  title: string
  content: string
  img?: Array<string>
  comment: number
  date: string
}

const searchValue: string = 'Đại hội'

const data: searchData[] = [
  {
    id: '1',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: [],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
]

const TimKiemPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
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
  const { data } = useQuery({
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

  const postResult: SearchPostType[] =
    data?.data.map((post) => ({
      id: post._id,
      categorized: post.categrory,
      title: post.title,
      description: post.description ?? '',
      content: post.content ?? '',
      img: post.titleImageId
        ? process.env.NEXT_PUBLIC_API_BASE_URL + '/download/' + post.titleImageId
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
      />
    </div>
  )
}

export default TimKiemPage
