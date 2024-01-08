'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const router = useRouter()
  return (
    <div>
      <button
        className='border'
        onClick={() =>
          signOut({ redirect: false }).then(() => router.push('/login'))
        }
      >
        Đăng xuất
      </button>
    </div>
  )
}

export default Logout
