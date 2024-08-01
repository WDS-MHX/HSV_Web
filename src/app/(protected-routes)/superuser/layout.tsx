import AdminSidebar from '@/components/ui/AdminSidebar'
import AdminHeader from '@/components/ui/AdminHeader'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full bg-sky-600'>
      <AdminHeader role='Superuser' />
      <div className='flex'>
        <AdminSidebar role='Superuser' />
        <div className='w-full'>{children}</div>
      </div>
    </div>
  )
}

export default Layout
