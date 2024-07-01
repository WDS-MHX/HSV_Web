import Navbar from '../Navbar'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='max-w-6xl w-full mx-auto'>
      <div className='relative w-full'>
        <Image
          src='/assets/images/header_banner.png'
          layout='responsive'
          width={1200}
          height={400}
          objectFit='contain'
          alt='header_banner'
        />
      </div>
      <Navbar />
    </header>
  )
}

export default Header
