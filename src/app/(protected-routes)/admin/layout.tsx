import AdminSidebar from '@/components/ui/AdminSidebar'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full'>
      <AdminSidebar />
      <div className='w-full'>{children}</div>
    </div>
  )
}

export default Layout
