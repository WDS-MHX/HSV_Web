import Image from 'next/image'
import { TbCircleLetterC } from 'react-icons/tb'
import { GrLocation } from 'react-icons/gr'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className='flex justify-center items-center bg-[#F1F5F9] h-[300px] p-2.5 w-full'>
      <div className='flex gap-32 items-center'>
        <Image
          src='/assets/images/footer_logos.png'
          alt='footer_logos'
          width={240}
          height={94}
          className='object-contain'
        />
        <ul className='flex flex-col gap-6 text-[#0F172A] text-sm'>
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
