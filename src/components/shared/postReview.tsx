import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { GrLinkNext } from 'react-icons/gr'
import { comment } from 'postcss'
import { title } from 'process'
import { string, date, number } from 'zod'

interface postReviewType {
  img?: string | StaticImageData
  categorized?: string
  title?: string
  content?: string
  date?: string
  comment?: number
}

const PostReview = ({ img, categorized, title, content, date, comment }: postReviewType) => {
  return (
    <div className='flex gap-2 p-4'>
      <div className='lg:h-[25.875rem] lg:max-h-[25.875rem] md:basis-8/12 md:h-auto'>
        {!!img && (
          <Image id='imgPost' src={img} alt='' className='w-full object-contain h-full'></Image>
        )}
      </div>
      <div className='flex lg:w-3/6 md:basis-1/2 h-auto flex-col justify-between'>
        <div className='flex flex-col'>
          <div className='flex w-fit mb-2 items-center justify-center rounded-full bg-categorized px-2 text-center align-middle'>
            <p className='text-center text-[0.75rem] font-semibold text-white'>{categorized}</p>
          </div>
          <div className='text-wrap text-slate-800 font-semibold lg:text-2xl md:text-xl lg:leading-8 md:leading-7 md:tracking-neg-05 text-justify'>
            {title}
          </div>
          <div className='md:hidden lg:block mt-2 post_content w-full text-justify text-sm text-slate-900 leading-6 font-normal'>
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
