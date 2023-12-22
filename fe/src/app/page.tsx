import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession()
  return (
    <div>
      <h1>Chat app</h1>
      <Link href="/api/auth/signout" className='border'>Dang xuat</Link>
    </div>
  )
}
