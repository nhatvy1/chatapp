'use client'
import { registerAction } from '@/actions/register'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setSelectedFile(event.target.files[0])
  }

  const onSubmit: SubmitHandler<IRegister> = async (values) => {
    try {
      setLoading(true)
      const formData: any = new FormData()
      formData.append('email', values.email)
      formData.append('fullName', values.fullName)
      formData.append('password', values.password)
      formData.append('avatar', selectedFile)
  
      const res = await registerAction(formData)
      if(res.message === 'Success') {
        toast.success('Đăng ký thành công')
        router.push('/login')
      }
    } catch(e) {
      toast.error('Đăng ký thất bại')
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
          encType="multipart/form-data"
          method="POST"
        >
          <h1 className="text-center text-4xl text-primary mb-4">Đăng ký</h1>
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
                      !fieldValue.endsWith('.xyz') || 'Email này không được phép'
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
          <div className="flex flex-col mt-2">
            <label htmlFor="password" className="text-xl mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              className="border p-2 rounded-lg outline-none"
              {...register('fullName', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập họ và tên',
                },
              })}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="password" className="text-xl mb-1">
              Ảnh đại diện
            </label>
            <input
              type="file"
              placeholder="Nhập họ và tên"
              className="border p-2 rounded-lg outline-none"
              {...register('avatar', {
                required: {
                  value: true,
                  message: 'Vui lòng chọn ảnh đại diện',
                },
              })}
              onChange={handleFileChange}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <p className="mt-2">
            Đã có tài khoản{' '}
            <Link href="/login" className="text-primary">
              Đăng nhập
            </Link>
          </p>
          <button className="w-full mt-4 border p-2 rounded-lg" type="submit">
            Đăng ký
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

export default Register
