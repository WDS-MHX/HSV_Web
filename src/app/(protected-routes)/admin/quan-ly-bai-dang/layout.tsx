import { Suspense } from 'react'

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>
}

export default AdminLayout
