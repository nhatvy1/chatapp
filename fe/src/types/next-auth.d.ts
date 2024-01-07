import NextAuth from 'next-auth'
import { JWT } from "next-auth/jwt"

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: number
      fullName: string
      email: string
      avatar: string
    }
    access_token: string
    refresh_token: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: number,
      email: string
      fullName: string
      avatar: string
    }

    access_token: string
    refresh_token: string
  }
}
