'use client'
import { signOut } from 'next-auth/react'

const Logout = () => {
  return (
    <div>
      <button className="border" onClick={() => signOut()}>
        Đăng xuất
      </button>
    </div>
  )
}

export default Logout
