'use client'

import { useState, useEffect } from 'react'
import { StaticImageData } from 'next/image'

import SelectOption from './SelectOption'
import PostReview from './postReview'
import Pagination from './Pagination'

interface searchData {
  id: string
  categorized: string
  title: string
  content: string
  img?: string | StaticImageData
  comment: number
  date: string
}

interface ResultPageType {
  searchValue: string
  searchResults: Array<searchData>
}

const ResultPage = ({ searchValue, searchResults }: ResultPageType) => {
  const [isLatest, setisLatest] = useState<boolean>(true)
  const [currentOffset, setCurrentOffset] = useState<number>(0)
  const [newSearchValue, setNewSearchValue] = useState<string>(searchValue)
  const itemsPerPage = 5

  const handleItemOffsetChange = (newOffset: number) => {
    setCurrentOffset(newOffset)
  }

  const handleChange = (e: { target: { value: string } }) => {
    setNewSearchValue(e.target.value)
  }

  const currentItems = searchResults.slice(currentOffset, currentOffset + itemsPerPage)

  function shortenText(text: string, wordLimit: number): string {
    const words: string[] = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + ' ...'
    }
    return text
  }

  return (
    <div className='flex gap-4 w-full'>
      {/* Category Bar */}
      <div className='rounded-md px-4 py-2 bg-background w-[11.25rem] h-fit flex-shrink-0 sticky top-12 max-lg:hidden'>
        <div className='text-sky-900 font-semibold text-lg'>Category</div>
        <div className='py-2 text-secondary text-sm font-medium'>
          <ul className='mt-12'>
            <li className='flex gap-2'>
              <input
                type='checkbox'
                id='checkbox-1'
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
              />
              <label className='cursor-pointer' htmlFor='checkbox-1'>
                Sinh viên 5 tốt
              </label>
            </li>
            <li className='flex gap-2'>
              <input
                type='checkbox'
                id='checkbox-2'
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
              />
              <label className='cursor-pointer' htmlFor='checkbox-2'>
                Câu chuyện đẹp
              </label>
            </li>
            <li className='flex gap-2'>
              <input
                type='checkbox'
                id='checkbox-3'
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
              />
              <label className='cursor-pointer' htmlFor='checkbox-3'>
                Tình nguyện
              </label>
            </li>
            <li className='flex gap-2'>
              <input
                type='checkbox'
                id='checkbox-4'
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
              />
              <label className='cursor-pointer' htmlFor='checkbox-4'>
                NCKH
              </label>
            </li>
            <li className='flex gap-2'>
              <input
                type='checkbox'
                id='checkbox-5'
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
              />
              <label className='cursor-pointer' htmlFor='checkbox-5'>
                Hỗ trợ sinh viên
              </label>
            </li>
            <li className='flex gap-2'>
              <input
                type='checkbox'
                id='checkbox-6'
                className='rounded border-[#E5E7EB] border mb-4 cursor-pointer'
              />
              <label className='cursor-pointer' htmlFor='checkbox-6'>
                Xây dựng hội
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Container */}
      <div className='flex-grow'>
        <div className='flex gap-6 max-lg:gap-2 bg-background px-8 py-2 rounded-md'>
          <SelectOption className='lg:hidden max-md:hidden' />
          <div className='border-[1px] border-slate-300 rounded-md lg:ml-2 md:mx-2 mx-0 w-full'>
            <input
              className='border-none rounded-md mr-2 py-2.5 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
              value={newSearchValue}
              onChange={handleChange}
            />
          </div>
          <button className='max-md:px-8 button-primary'>Tìm</button>
        </div>
        <SelectOption className='lg:hidden md:hidden w-full px-8' />

        <div className='mt-4 px-4 py-2'>
          <div className='md:flex justify-between'>
            <div className='flex gap-2 items-center'>
              <p className='text-secondary text-xs font-medium'>Sắp xếp theo: </p>
              <button
                onClick={() => setisLatest(true)}
                className={`text-sm ${isLatest ? 'font-medium text-primary' : 'font-normal text-secondary'}`}
              >
                Mới nhất
              </button>
              <p className='text-primary'>|</p>
              <button
                onClick={() => setisLatest(false)}
                className={`text-sm ${!isLatest ? 'font-medium text-primary' : 'font-normal text-secondary'}`}
              >
                Liên quan
              </button>
            </div>

            <div className='flex gap-1 text-[#0C4A6E]'>
              <p className='font-semibold'>{searchResults?.length}</p>
              <p>kết quả</p>
            </div>
          </div>

          {currentItems?.map((searchResult, index) => (
            <PostReview
              key={index}
              img={searchResult.img}
              categorized={searchResult.categorized}
              title={searchResult.title}
              content={shortenText(searchResult.content, 30)}
              date={searchResult.date}
              comment={searchResult.comment}
            />
          ))}

          <Pagination
            itemsPerPage={itemsPerPage}
            setItemOffset={handleItemOffsetChange}
            notilength={searchResults.length}
          />
        </div>
      </div>
    </div>
  )
}

export default ResultPage
