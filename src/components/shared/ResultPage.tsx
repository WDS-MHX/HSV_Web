import React from 'react'

interface ResultPageType {
  searchValue: string
}

const ResultPage = ({ searchValue }: ResultPageType) => {
  return (
    <div className='flex gap-4 w-full'>
      {/* Category Bar */}
      <div className='rounded-md px-4 py-2 bg-background w-[11.25rem] h-fit flex-shrink-0'>
        <div className='text-sky-900 font-semibold text-lg'>Category</div>
        <div className='py-2 text-secondary text-sm font-medium'>
          <ul className='mt-12'>
            <li className='flex gap-2'>
              <input type='checkbox' className='rounded border-[#E5E7EB] border mb-4' />
              <p>Sinh viên 5 tốt</p>
            </li>
            <li className='flex gap-2'>
              <input type='checkbox' className='rounded border-[#E5E7EB] border mb-4' />
              <p>Câu chuyện đẹp</p>
            </li>
            <li className='flex gap-2'>
              <input type='checkbox' className='rounded border-[#E5E7EB] border mb-4' />
              <p>Tình nguyện</p>
            </li>
            <li className='flex gap-2'>
              <input type='checkbox' className='rounded border-[#E5E7EB] border mb-4' />
              <p>NCKH</p>
            </li>
            <li className='flex gap-2'>
              <input type='checkbox' className='rounded border-[#E5E7EB] border mb-4' />
              <p>Hỗ trợ sinh viên</p>
            </li>
            <li className='flex gap-2'>
              <input type='checkbox' className='rounded border-[#E5E7EB] border mb-4' />
              <p>Xây dựng hội</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Container */}
      <div className='flex-grow'>
        <div className='flex gap-6 bg-background px-8 py-2 rounded-md'>
          <div className='border-2 rounded-md p-0.5 w-full'>
            <input
              className='border-none w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
              value='Đại hội'
            />
          </div>
          <button className='button-primary'>
            <p className='font-medium text-sm leading-6 text-white'>Tìm</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
