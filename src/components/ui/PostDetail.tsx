'use client'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'

import postApi from '@/apis/post'
import '@/configs/froala.config'
import { queryKeys } from '@/configs/queryKeys'
import { getPostCategoryTitle } from '@/helpers'
import { ADMIN_PATH_NAME } from '@/configs'
import { useRouter } from 'next/navigation'

const FroalaEditorView = dynamic(() => import('@/components/shared/FroalaViewComponent'), {
  ssr: false,
})

interface PostDetailType {
  id: string
  isAuth: boolean
}

const PostDetail = ({ id, isAuth }: PostDetailType) => {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: queryKeys.post.gen(id),
    queryFn: () => postApi.getPostById(id),
  })

  return (
    <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-1'>
      <div className='w-full lg:col-span-3 md:col-span-1'>
        <div className='flex items-center py-[0.625rem] lg:hidden md:mx-[3.438rem] mx-4 my-4'>
          <div className='border-[1px] border-slate-300 rounded-md w-full ml-0 mr-2'>
            <input
              className='border-none rounded-md mr-2 py-2 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
            ></input>
          </div>
          <button className='w-[5.625rem] button-primary'>Tìm</button>
        </div>

        <div className='flex justify-between mt-8'>
          <div className='flex w-fit mb-2 items-center justify-center rounded-full bg-categorized px-2 text-center align-middle'>
            <p className='text-center text-[0.75rem] font-semibold text-white'>
              {getPostCategoryTitle(data?.categrory)}
            </p>
          </div>
        </div>

        <FroalaEditorView model={data?.content} />

        {isAuth && (
          <img
            onClick={() => router.push(`${ADMIN_PATH_NAME.TAO_BAI_DANG}/${id}`)}
            src='/assets/images/edit_btn.png'
            className='cursor-pointer mx-auto w-16 h-16 hover:opacity-80'
          />
        )}
      </div>
      <div className='flex flex-col lg:block max-lg:hidden'>
        <div className='flex items-center py-[0.625rem]'>
          <div className='border-[1px] border-slate-300 rounded-md w-full ml-0 mr-2'>
            <input
              className='border-none rounded-md mr-2 py-2 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
            ></input>
          </div>
          <button className='button-primary'>Tìm</button>
        </div>
        {/* <div className='w-full border-t-4 border-sky-600'>
          <p className='text-sky-600 text-xl font-semibold text-justify leading-7 mb-4'>
            Bài đăng gần đây
          </p>
          <MostRecent
            img={picturePlaceHolder}
            content='UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028'
          ></MostRecent>
          <MostRecent
            img={picturePlaceHolder}
            content='UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028'
          ></MostRecent>
          <MostRecent
            img={picturePlaceHolder}
            content='UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028'
          ></MostRecent>
        </div> */}
      </div>
    </div>
  )
}

export default PostDetail
