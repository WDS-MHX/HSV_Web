import AdminSidebar from '@/components/ui/AdminSidebar'
import AdminHeader from '@/components/ui/AdminHeader'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full bg-[#E0F2FE]'>
      <AdminHeader />
      <div className='flex'>
        <AdminSidebar />
        <div className='w-full'>{children}</div>
      </div>
    </div>
  )
}

export default Layout
