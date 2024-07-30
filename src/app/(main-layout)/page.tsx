import { verifySession } from '@/services/verifySession'
import HomeComponent from './_component/Home'

export async function Home() {
  const { isAuth, role } = await verifySession()

  return <HomeComponent isAuth={isAuth} />
}

export default Home
