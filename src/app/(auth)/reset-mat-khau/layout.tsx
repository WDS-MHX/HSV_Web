import { Suspense } from 'react'

function ResetPwdLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>
}

export default ResetPwdLayout
