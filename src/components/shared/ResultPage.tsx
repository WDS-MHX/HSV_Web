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
  selectedCategories: Array<POST_CATEGORY>
  setSelectedCategories: React.Dispatch<React.SetStateAction<Array<POST_CATEGORY>>>
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchResults: Array<SearchPostType>
  itemsPerPage: number
  selectPage: (page: number) => void
  totalSearchItems: number
  isAdmin: boolean
  searchPosts: () => void
}

const ResultPage = ({
  selectedCategories,
  setSelectedCategories,
  searchValue,
  setSearchValue,
  searchResults,
  itemsPerPage,
  selectPage,
  totalSearchItems,
  isAdmin,
  searchPosts,
}: ResultPageType) => {
  const [currentItems, setCurrentItems] = useState<Array<SearchPostType>>(searchResults)
  const [searchText, setSearchText] = useState<string>('')

  const handleSelectCategory = (category: POST_CATEGORY) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
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
  }

  const handleChangeSearch = (e: { target: { value: string } }) => {
    setSearchText(e.target.value)
  }

  const handleSearchPosts = useCallback(() => {
    setSearchValue(searchText)
    searchPosts()
  }, [searchText, searchPosts, setSearchValue])

  useEffect(() => {
    const input = document.getElementById('search-bar')

    if (input) {
      const handleSearchEvent = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          handleSearchPosts()
        }
      }
      input.addEventListener('keypress', handleSearchEvent)
      return () => {
        input.removeEventListener('keypress', handleSearchEvent)
      }
    }
  }, [searchText, searchPosts, handleSearchPosts])

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
          <button onClick={handleSearchPosts} className='px-8 bg-sky-900 text-white rounded-md'>
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

          {currentItems?.map((searchResult, index) => {
            const imageSrc: string = searchResult.img ?? '/assets/images/picture-placeholder.png'

            return (
              <PostReview
                id={searchResult.id}
                key={index}
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
          })}
          <PaginationSearchResult
            itemsPerPage={itemsPerPage}
            selectPage={selectPage}
            totalItemsInAllPages={totalSearchItems}
          />
        </div>
      </div>
    </div>
  )
}

export default ResultPage
