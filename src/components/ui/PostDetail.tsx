'use client'

import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs/queryKeys'
import { getPostCategoryTitle } from '@/helpers'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { ADMIN_PATH_NAME, PATH_NAME } from '@/configs'
import '@/configs/froala.config'
import postApi from '@/apis/post'

const FroalaEditorView = dynamic(() => import('@/components/shared/FroalaViewComponent'), {
  ssr: false,
})

interface PostDetailType {
  id: string
  isAuth: boolean
}

const PostDetail = ({ id, isAuth }: PostDetailType) => {
  const router = useRouter()
  const [value, setValue] = useState<string>('')
  const [posted, setPosted] = useState<boolean>(true)

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.post.gen(id),
    queryFn: () => postApi.getPostById(id),
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    router.push(`${PATH_NAME.TIM_KIEM}?value=${value}`)
  }

  useEffect(() => {
    const input = document.getElementById('search-bar')

    if (input) {
      const handleSearchEvent = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          handleSubmit()
        }
      }
      input.addEventListener('keypress', handleSearchEvent)
      return () => {
        input.removeEventListener('keypress', handleSearchEvent)
      }
    }
  }, [value, handleSubmit])

  useEffect(() => {
    if (data) {
      const timePost = new Date(data?.postedDate || '')
      const currentTime = new Date()

      currentTime >= timePost ? setPosted(true) : setPosted(false)
    }
  }, [data])

  return (
    <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-1'>
      <div className='w-full lg:col-span-3 md:col-span-1'>
        <div className='flex items-center py-[0.625rem] lg:hidden md:mx-[3.438rem] mx-4 my-4'>
          <div className='border-[1px] border-slate-300 rounded-md w-full ml-0 mr-2'>
            <input
              id='search-bar'
              className='border-none rounded-md mr-2 py-2 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
              value={value}
              onChange={handleSearchChange}
            ></input>
          </div>
          <button className='w-[5.625rem] button-primary' onClick={handleSubmit}>
            Tìm
          </button>
        </div>

        {posted && data?.showPost ? (
          <>
            <div className='flex justify-between mt-8'>
              <div className='flex w-fit mb-2 items-center justify-center rounded-full bg-categorized px-2 text-center align-middle'>
                <p className='text-center text-[0.75rem] font-semibold text-white'>
                  {getPostCategoryTitle(data?.categrory)}
                </p>
              </div>
            </div>

            <FroalaEditorView model={data?.content} />
          </>
        ) : (
          <>
            <p
              className={`text-center items-center flex mx-auto py-5 justify-center w-full ${isLoading ? 'hidden' : ''}`}
            >
              This content is not available!
            </p>

            <div className={`text-center my-16 ${isLoading ? '' : 'hidden'}`}>
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
          </>
        )}

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
              id='search-bar'
              className='border-none rounded-md mr-2 py-2 px-3 w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
              value={value}
              onChange={handleSearchChange}
            ></input>
          </div>
          <button className='button-primary' onClick={handleSubmit}>
            Tìm
          </button>
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
