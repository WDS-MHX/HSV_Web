import { Header, Footer } from '@/components/ui'
import { verifySession } from '@/services/verifySession'

async function Layout({ children }: { children: React.ReactNode }) {
  const { isAuth, role } = await verifySession()

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <Header isAuth={isAuth} />
      <div className='max-w-6xl w-full mb-4 flex-1'>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
