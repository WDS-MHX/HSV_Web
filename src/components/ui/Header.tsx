import Navbar from './Navbar'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='max-w-6xl w-full mx-auto'>
      <div className='relative w-full'>
        <Image
          src='/assets/images/header_banner.png'
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={1200}
          height={400}
          object-fit='contain'
          alt='header_banner'
        />
      </div>
      <Navbar />
    </header>
  )
}

export default Header
