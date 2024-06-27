import React from 'react'
import Image from 'next/image'
import { GrLinkNext } from 'react-icons/gr'

interface postReviewType {
  img?: string
  categorized?: string
  title?: string
  content?: string
  date?: string
  comment?: number
}

const PostReview = ({ img, categorized, title, content, date, comment }: postReviewType) => {
  return (
    <div className='flex gap-2 p-4'>
      <div className='h-[25.875rem] max-h-[25.875rem]'>
        {!!img && <Image id='imgPost' src={img} alt='' className=' h-full'></Image>}
      </div>
      <div className='flex w-3/6 h-auto flex-col justify-between'>
        <div className='flex flex-col'>
          <div className='flex w-fit mb-2 items-center justify-center rounded-full bg-categorized px-2 text-center align-middle'>
            <p className='text-center text-[0.75rem] font-semibold text-white'>{categorized}</p>
          </div>
          <div className='text-wrap text-slate-800 font-semibold text-2xl leading-8 text-justify'>
            {title}
          </div>
          <div className=' mt-2 post_content w-full text-justify text-sm text-slate-900 leading-6 font-normal'>
            <p>{content}</p>
          </div>
          <div className='flex mt-2'>
            <p className='text-slate-500 font-medium text-justify leading-5 text-[0.75rem] mr-6'>
              {date}
            </p>
            <p className='text-slate-500 font-medium text-justify leading-5 text-[0.75rem]'>
              comment: {comment}
            </p>
          </div>
        </div>
        <div className='w-full flex justify-end items-end'>
          <button className='bg-slate-200 font-medium leading-6 text-slate-900 px-4 py-2 flex items-center rounded-lg'>
            Chi tiết <GrLinkNext className='ml-2' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostReview
