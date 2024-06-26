import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <Header />
      <div className='max-w-6xl w-full'>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
