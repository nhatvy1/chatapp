'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Login = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>()

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      setLoading(true)
      const loginResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: searchParams?.get('callbackUrl') || '/',
      })
      if (!loginResult?.ok && loginResult?.status) {
        toast.error(loginResult.error)
      }
      if (loginResult?.ok && loginResult?.url) {
        toast.success('Đăng nhập thành công')
        router.push(loginResult.url)
      }
    } catch(e) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center bg-bg-image">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[360px] p-4 border rounded-lg bg-white shadow-lg"
        >
          <h1 className="text-center text-4xl text-primary mb-4">Đăng nhập</h1>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl mb-1">
              Tài khoản
            </label>
            <input
              type="text"
              placeholder="Nhập email"
              className="border p-2 rounded-lg outline-none"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Địa chỉ email không hợp lệ',
                },
                required: {
                  value: true,
                  message: 'Vui lòng nhập email',
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== 'chatapp@gmail.com' ||
                      'Hãy thử địa chỉ email khác'
                    )
                  },
                  notBlacklisted: (fieldValue) => {
                    return (
                      !fieldValue.endsWith('.xyz') ||
                      'Email này không được phép'
                    )
                  },
                },
              })}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="password" className="text-xl mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="border p-2 rounded-lg outline-none"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập mật khẩu',
                },
              })}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <p className='mt-2'>
            Chưa có tài khoản? <Link href="/register" className='text-primary'>Đăng ký</Link>
          </p>
          <button className="w-full mt-4 border p-2 rounded-lg" type="submit">
            Đăng nhập
          </button>
        </form>
      </div>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black-custom z-20">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>
      )}
    </>
  )
}

export default Login
