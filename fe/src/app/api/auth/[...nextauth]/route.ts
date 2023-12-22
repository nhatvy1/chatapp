import { axiosInstanceNonAuth } from '@/axios/instance'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'Nhập email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Nhập mật khẩu',
        },
      },
      async authorize(credentials, req): Promise<any> {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const response: any = await axiosInstanceNonAuth.post('/auth/login', credentials)
        if (response && response.statusCode === 200) {
          return response.result
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('Check token: ', token)
      console.log('Check user: ', user)

      return token
    },
    async session({ session, user, token }) {
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
