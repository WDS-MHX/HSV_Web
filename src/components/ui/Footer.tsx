import Image from 'next/image'
import { TbCircleLetterC } from 'react-icons/tb'
import { GrLocation } from 'react-icons/gr'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className='md:flex justify-center items-center bg-background h-[21rem] p-2.5 w-full'>
      <div className='md:flex gap-32 items-center'>
        <Image
          src='/assets/images/footer_logos.png'
          alt='footer_logos'
          width={240}
          height={94}
          className='object-contain max-md:mx-auto'
        />
        <ul className='flex flex-col gap-6 text-primary text-sm max-md:mt-5'>
          <li className='flex items-center gap-7'>
            <TbCircleLetterC color='[#0F172A]' size={24} />
            <p>Hội Sinh viên Việt Nam Trường Đại học Công Nghệ Thông Tin, ĐHQG-HCM</p>
          </li>
          <li className='flex items-center gap-7'>
            <GrLocation color='[#0F172A]' size={24} />
            <p>Khu phố 6, phường Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh</p>
          </li>
          <li className='flex items-center gap-7'>
            <FiPhone color='[#0F172A]' size={24} />
            <a href='tel:0828769763'>0828769763</a>
          </li>
          <li className='flex items-center gap-7'>
            <HiOutlineMail color='[#0F172A]' size={24} />
            <a href='mailto:Hoisinhvien@uit.edu.vn'>Hoisinhvien@uit.edu.vn</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
