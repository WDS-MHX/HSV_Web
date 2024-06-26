import Navbar from './Navbar'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='max-w-6xl w-full'>
      <div className='relative w-full h-[200px] overflow-hidden'>
        <Image
          src='/assets/images/header_banner.png'
          fill
          style={{ objectFit: 'contain' }}
          className='w-full'
          alt='header_banner'
        />
      </div>
      <Navbar />
    </header>
  )
}

export default Header
