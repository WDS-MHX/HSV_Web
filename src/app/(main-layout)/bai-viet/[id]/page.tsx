import { PostDetail } from '@/components/ui'
import { verifySession } from '@/services/verifySession'

interface BaiVietProps {
  id: string
  isAuth: boolean
  role: string
}

const BaiViet = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { isAuth, role } = await verifySession()

  return (
    <div>
      <PostDetail id={id} isAuth={isAuth} />
    </div>
  )
}

export default BaiViet
