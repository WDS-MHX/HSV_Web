import React from 'react'
import Image from 'next/image'
import { GrLinkNext } from 'react-icons/gr'

interface mostRecentType {
  img?: string
  content?: string
}

const MostRecent = ({ img, content }: mostRecentType) => {
  return (
    <div className='flex flex-col mb-6 w-full'>
      {!!img && (
        <Image src={img} alt='' className='object-cover object-center h-[7.5rem] w-full'></Image>
      )}
      <div className='flex h-fit m-2 flex-col'>
        <p className='text-slate-800 text-sm font-normal text-justify leading-6'>{content}</p>
      </div>
    </div>
  )
}

export default MostRecent
