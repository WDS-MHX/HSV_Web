import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { GrLinkNext } from 'react-icons/gr'
import { getPostCategoryTitle, shortenText } from '@/helpers'
import { PostReviewType } from '@/types/post'
import { useRouter } from 'next/navigation'
import { PATH_NAME } from '@/configs'
import { format } from 'date-fns'

const PostReview = ({
  id,
  img,
  categorized,
  title,
  description,
  content,
  date,
  isSearchPage,
  hasCategoryBadge = false,
}: Partial<PostReviewType> & { hasCategoryBadge?: boolean }) => {
  const router = useRouter()

  return (
    <div className='flex gap-2 p-4 md:flex-row flex-col'>
      <div className='md:basis-8/12 md:h-auto w-full'>
        {!!img &&
          (!isSearchPage ? (
            <Image
              id='imgPost'
              src={img}
              alt=''
              width={500}
              height={500}
              object-fit='contain'
              className='imgpost'
            />
          ) : (
            <Image
              id='imgSearch'
              src={img}
              alt=''
              width={500}
              height={500}
              object-fit='contain'
              className='imgsearch'
            />
          ))}
      </div>
      <div className='flex lg:w-3/6 md:basis-1/2 h-auto flex-col justify-between'>
        <div className='flex flex-col'>
          {hasCategoryBadge && (
            <div className='flex w-fit mb-2 items-center justify-center rounded-full bg-categorized px-2 text-center align-middle'>
              <p className='text-center text-[0.75rem] font-semibold text-white'>
                {getPostCategoryTitle(categorized)}
              </p>
            </div>
          )}
          {!isSearchPage ? (
            <div className='text-wrap text-slate-800 font-semibold lg:text-2xl md:text-xl text-[1.125rem] lg:leading-8 md:leading-7 md:tracking-neg-05 text-justify'>
              {title}
            </div>
          ) : (
            <div className='text-wrap text-slate-800 font-semibold lg:text-xl text-[1.125rem] lg:leading-8 md:leading-7 md:tracking-neg-05 text-justify'>
              {title}
            </div>
          )}
          <div className='hidden mt-2 post_content w-full text-justify text-sm text-slate-900 leading-6 font-normal'>
            <p>{shortenText(description ?? '', 30)}</p>
          </div>
          <div className='flex mt-2'>
            <p className='text-slate-500 font-medium text-justify leading-5 text-[0.75rem] mr-6'>
              {date ? format(date, 'dd/MM/yyyy') : 'Không rõ'}
            </p>
            {/* <p className='text-slate-500 font-medium text-justify leading-5 text-[0.75rem]'>
              comment: {comment}
            </p> */}
          </div>
        </div>
        <div className='w-full flex justify-end items-end'>
          <button
            onClick={() => router.push(`${PATH_NAME.BAI_VIET}/${id}`)}
            className='bg-slate-200 font-medium leading-6 text-slate-900 px-4 py-2 flex items-center rounded-lg'
          >
            Chi tiết <GrLinkNext className='ml-2' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostReview
