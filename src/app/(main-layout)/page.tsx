import Image from 'next/image'
import { PostReview } from '@/components'
import { picturePlaceHolder } from '../../../public'
import { MostRecent } from '@/components'
export default function Home() {
  return (
    <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-1'>
      <div className='w-full lg:col-span-3 md:col-span-1'>
        <div className='flex items-center py-[0.625rem] lg:hidden md:mx-[3.438rem] mx-4 my-4'>
          <div className='border-2 rounded-md mr-2 p-0.5 w-full'>
            <input
              className='border-none w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
            ></input>
          </div>
          <button className='w-[5.625rem] button-primary'>Tìm</button>
        </div>
        <div className='border-b-2 pb-6'>
          <PostReview
            img={picturePlaceHolder}
            categorized='uncategorized'
            title='UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028'
            content='Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra'
            date='26/05/2023'
            comment={1}
          ></PostReview>
        </div>
        <div className='flex flex-col mt-6'>
          <p className='text-slate-600 pl-4 font-semibold text-[1.125rem] leading-7 text-justify'>
            Sinh viên 5 tốt
          </p>
          <PostReview
            img={picturePlaceHolder}
            categorized='Sinh viên 5 tốt'
            title='TUYÊN DƯƠNG SINH VIÊN 5 TỐT NĂM HỌC 2022 - 2023'
            content='“Sinh viên 5 tốt” là danh hiệu cao quý của sinh viên Việt Nam, minh chứng cho sự nỗ lực, cố gắng của mỗi cá nhân trong quá trình rèn luyện, hoàn thiện bản thân ở năm tiêu chí: Học tập tốt - Đạo đức tốt - Tình nguyện tốt - Hội nhập tốt - Thể lực tốt.'
            date='26/05/2023'
            comment={1}
          ></PostReview>
          <PostReview
            img={picturePlaceHolder}
            categorized='Sinh viên 5 tốt'
            title='TUYÊN DƯƠNG SINH VIÊN 5 TỐT NĂM HỌC 2022 - 2023'
            content='“Sinh viên 5 tốt” là danh hiệu cao quý của sinh viên Việt Nam, minh chứng cho sự nỗ lực, cố gắng của mỗi cá nhân trong quá trình rèn luyện, hoàn thiện bản thân ở năm tiêu chí: Học tập tốt - Đạo đức tốt - Tình nguyện tốt - Hội nhập tốt - Thể lực tốt.'
            date='26/05/2023'
            comment={1}
          ></PostReview>
          <PostReview
            img={picturePlaceHolder}
            categorized='Sinh viên 5 tốt'
            title='TUYÊN DƯƠNG SINH VIÊN 5 TỐT NĂM HỌC 2022 - 2023'
            content='“Sinh viên 5 tốt” là danh hiệu cao quý của sinh viên Việt Nam, minh chứng cho sự nỗ lực, cố gắng của mỗi cá nhân trong quá trình rèn luyện, hoàn thiện bản thân ở năm tiêu chí: Học tập tốt - Đạo đức tốt - Tình nguyện tốt - Hội nhập tốt - Thể lực tốt.'
            date='26/05/2023'
            comment={1}
          ></PostReview>
          <div className='flex justify-center items-center w-full'>
            <button className='flex items-center bg-sky-800 text-white px-4 py-2 rounded-lg font-medium text-sm leading-6'>
              Xem thêm ...
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:block max-lg:hidden'>
        <div className='flex items-center py-[0.625rem]'>
          <div className='border-2 rounded-md mr-2 p-0.5 w-full'>
            <input
              className='border-none w-full focus:outline-none bg-white text-black text-sm font-normal leading-5'
              placeholder='Search'
            ></input>
          </div>
          <button className='button-primary'>Tìm</button>
        </div>
        <div className='w-full border-t-4 border-sky-600'>
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
        </div>
      </div>
    </div>
  )
}
