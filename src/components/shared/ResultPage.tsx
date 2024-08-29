'use client'

import React, { useState, useEffect, useCallback } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from './SelectOption'
import PostReview from './postReview'
import { POST_CATEGORY } from '@/configs/enum'
import { SearchPostType } from '@/types/post'
import PaginationSearchResult from './pagination-search-result'

const options: readonly {
  optionType: POST_CATEGORY
  optionName: string
  isPlaceHolder?: boolean
}[] = [
  {
    optionType: POST_CATEGORY.TAT_CA,
    optionName: 'Tất cả',
  },
  {
    optionType: POST_CATEGORY.GIOI_THIEU,
    optionName: 'Giới thiệu',
  },
  {
    optionType: POST_CATEGORY.SINH_VIEN_5_TOT,
    optionName: 'Sinh viên 5 tốt',
  },
  {
    optionType: POST_CATEGORY.CAU_CHUYEN_DEP,
    optionName: 'Câu chuyện đẹp',
  },
  {
    optionType: POST_CATEGORY.TINH_NGUYEN,
    optionName: 'Tình nguyện',
  },
  {
    optionType: POST_CATEGORY.NCKH,
    optionName: 'NCKH',
  },
  {
    optionType: POST_CATEGORY.HO_TRO_SINH_VIEN,
    optionName: 'Hỗ trợ sinh viên',
  },
  {
    optionType: POST_CATEGORY.XAY_DUNG_HOI,
    optionName: 'Xây dựng hội',
  },
]

interface ResultPageType {
  isLoading?: boolean
  selectedCategories: Array<POST_CATEGORY>
  setSelectedCategories: React.Dispatch<React.SetStateAction<Array<POST_CATEGORY>>>
  searchValue: string
  searchResults: Array<SearchPostType>
  itemsPerPage: number
  selectPage: (page: number) => void
  totalSearchItems: number
  isAdmin: boolean
  currentPage: number
  searchPosts: () => void
  handleSearch: (value: string) => void
}

const ResultPage = ({
  isLoading,
  selectedCategories,
  setSelectedCategories,
  searchValue,
  searchResults,
  itemsPerPage,
  selectPage,
  totalSearchItems,
  isAdmin,
  currentPage,
  searchPosts,
  handleSearch,
}: ResultPageType) => {
  const [currentItems, setCurrentItems] = useState<Array<SearchPostType>>(searchResults)
  const [searchText, setSearchText] = useState<string>(searchValue)
  const [isSearch, setIsSearch] = useState<boolean>(false)

  const handleSelectCategory = (category: POST_CATEGORY) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
    selectPage(1)
  }

  const handleSelectOneCategory = (category: POST_CATEGORY) => {
    if (category !== POST_CATEGORY.TAT_CA) {
      setSelectedCategories([category])
    } else {
      setSelectedCategories([
        POST_CATEGORY.GIOI_THIEU,
        POST_CATEGORY.SINH_VIEN_5_TOT,
        POST_CATEGORY.CAU_CHUYEN_DEP,
        POST_CATEGORY.TINH_NGUYEN,
        POST_CATEGORY.NCKH,
        POST_CATEGORY.HO_TRO_SINH_VIEN,
        POST_CATEGORY.XAY_DUNG_HOI,
      ])
    }
    selectPage(1)
  }

  const handleChangeSearch = (e: { target: { value: string } }) => {
    setSearchText(e.target.value)
    const handleSearchBlank = () => {
      if (e.target.value === '') {
        handleSearch(e.target.value)
      }
    }
    setTimeout(handleSearchBlank, 300)
  }

  useEffect(() => {
    const input = document.getElementById('search-bar')

    if (input) {
      const handleSearchEvent = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          handleSearch(searchText)
        }
      }
      input.addEventListener('keypress', handleSearchEvent)

      return () => {
        input.removeEventListener('keypress', handleSearchEvent)
      }
    }
  }, [searchText, searchPosts, handleSearch])

  useEffect(() => {
    setCurrentItems(
      searchResults.filter(
        (item) => item.categorized && selectedCategories.includes(item.categorized),
      ),
    )
  }, [searchResults, selectedCategories])

  return (
    <div className='flex gap-4 w-full'>
      {/* Category Bar */}
      <div className='rounded-md px-4 py-2 bg-backgroundColor w-[11.25rem] h-fit flex-shrink-0 sticky top-12 max-lg:hidden'>
        <div className='text-sky-900 font-semibold text-lg'>Category</div>
        <div className='py-2 text-secondaryColor text-sm font-medium'>
          <ul className='mt-12'>
            <li className='flex gap-2 mb-4'>
              <input
                checked={selectedCategories.includes(POST_CATEGORY.GIOI_THIEU)}
                type='checkbox'
                id={POST_CATEGORY.GIOI_THIEU}
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
                onChange={() => handleSelectCategory(POST_CATEGORY.GIOI_THIEU)}
              />
              <label className='cursor-pointer' htmlFor={POST_CATEGORY.GIOI_THIEU}>
                Giới thiệu
              </label>
            </li>
            <li className='flex gap-2 mb-4'>
              <input
                checked={selectedCategories.includes(POST_CATEGORY.SINH_VIEN_5_TOT)}
                type='checkbox'
                id={POST_CATEGORY.SINH_VIEN_5_TOT}
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
                onChange={() => handleSelectCategory(POST_CATEGORY.SINH_VIEN_5_TOT)}
              />
              <label className='cursor-pointer' htmlFor={POST_CATEGORY.SINH_VIEN_5_TOT}>
                Sinh viên 5 tốt
              </label>
            </li>
            <li className='flex gap-2 mb-4'>
              <input
                checked={selectedCategories.includes(POST_CATEGORY.CAU_CHUYEN_DEP)}
                type='checkbox'
                id={POST_CATEGORY.CAU_CHUYEN_DEP}
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
                onChange={() => handleSelectCategory(POST_CATEGORY.CAU_CHUYEN_DEP)}
              />
              <label className='cursor-pointer' htmlFor={POST_CATEGORY.CAU_CHUYEN_DEP}>
                Câu chuyện đẹp
              </label>
            </li>
            <li className='flex gap-2 mb-4'>
              <input
                checked={selectedCategories.includes(POST_CATEGORY.TINH_NGUYEN)}
                type='checkbox'
                id={POST_CATEGORY.TINH_NGUYEN}
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
                onChange={() => handleSelectCategory(POST_CATEGORY.TINH_NGUYEN)}
              />
              <label className='cursor-pointer' htmlFor={POST_CATEGORY.TINH_NGUYEN}>
                Tình nguyện
              </label>
            </li>
            <li className='flex gap-2 mb-4'>
              <input
                checked={selectedCategories.includes(POST_CATEGORY.NCKH)}
                type='checkbox'
                id={POST_CATEGORY.NCKH}
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
                onChange={() => handleSelectCategory(POST_CATEGORY.NCKH)}
              />
              <label className='cursor-pointer' htmlFor={POST_CATEGORY.NCKH}>
                NCKH
              </label>
            </li>
            <li className='flex gap-2 mb-4'>
              <input
                checked={selectedCategories.includes(POST_CATEGORY.HO_TRO_SINH_VIEN)}
                type='checkbox'
                id={POST_CATEGORY.HO_TRO_SINH_VIEN}
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
                onChange={() => handleSelectCategory(POST_CATEGORY.HO_TRO_SINH_VIEN)}
              />
              <label className='cursor-pointer' htmlFor={POST_CATEGORY.HO_TRO_SINH_VIEN}>
                Hỗ trợ sinh viên
              </label>
            </li>
            <li className='flex gap-2 mb-4'>
              <input
                checked={selectedCategories.includes(POST_CATEGORY.XAY_DUNG_HOI)}
                type='checkbox'
                id={POST_CATEGORY.XAY_DUNG_HOI}
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
                onChange={() => handleSelectCategory(POST_CATEGORY.XAY_DUNG_HOI)}
              />
              <label className='cursor-pointer' htmlFor={POST_CATEGORY.XAY_DUNG_HOI}>
                Xây dựng hội
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Container */}
      <div className='flex-grow'>
        <div className='flex md:justify-normal justify-center gap-6 max-lg:gap-2 max-lg:bg-white lg:bg-backgroundColor px-8 py-2 rounded-md'>
          <Select
            onValueChange={(value) => handleSelectOneCategory(value as POST_CATEGORY)}
            defaultValue={options[0].optionType}
          >
            <SelectTrigger className='lg:hidden max-md:hidden md:w-auto w-full'>
              <SelectValue placeholder='Chọn danh mục'></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Chọn danh mục</SelectLabel>
                {options.map((i) => (
                  <SelectItem key={i.optionName} value={i.optionType}>
                    {i.optionName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <SelectOption className='lg:hidden max-md:hidden' /> */}
          <div className='border-[1px] border-slate-300 rounded-md lg:ml-2 md:mx-2 mx-0 w-full'>
            <input
              id='search-bar'
              className='border-none rounded-md mr-2 py-2.5 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
              value={searchText}
              onChange={handleChangeSearch}
            />
          </div>
          <button
            onClick={() => handleSearch(searchText)}
            className='px-8 bg-sky-900 text-white rounded-md'
          >
            Tìm
          </button>
        </div>
        <Select
          onValueChange={(value) => handleSelectOneCategory(value as POST_CATEGORY)}
          defaultValue={options[0].optionType}
        >
          <SelectTrigger className='lg:hidden md:hidden w-[90%] mx-auto'>
            <SelectValue placeholder='Chọn danh mục'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Chọn danh mục</SelectLabel>
              {options.map((i) => (
                <SelectItem key={i.optionName} value={i.optionType}>
                  {i.optionName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <SelectOption className='lg:hidden md:hidden w-full px-8' /> */}

        <div className='mt-4 px-4 py-2'>
          <div className='md:flex justify-between flex-row-reverse'>
            <div className='flex gap-1 text-[#0C4A6E]'>
              <p className='font-semibold'>{totalSearchItems}</p>
              <p>kết quả</p>
            </div>
          </div>

          {!isLoading ? (
            currentItems?.map((searchResult, index) => {
              const imageSrc: string = searchResult.img ?? '/assets/images/picture-placeholder.png'

              return (
                <PostReview
                  isAuth={isAdmin}
                  id={searchResult.id}
                  key={searchResult.id}
                  img={imageSrc}
                  categorized={searchResult.categorized}
                  title={searchResult.title}
                  description={searchResult.description}
                  content={searchResult.content}
                  date={searchResult.date}
                  isSearchPage={true}
                  hasCategoryBadge
                />
              )
            })
          ) : (
            <div className='text-center my-16'>
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='inline w-8 h-8 text-gray-200 animate-spin fill-sky-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          <PaginationSearchResult
            itemsPerPage={itemsPerPage}
            selectPage={selectPage}
            totalItemsInAllPages={totalSearchItems}
            isSearch={isSearch}
            currentPageNumber={currentPage}
            onSearch={() => setIsSearch(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default ResultPage
