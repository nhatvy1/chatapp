import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { backend_url } from '@/lib/constant'
import { getServerSession } from 'next-auth'

export async function fetchDataWithAuth() {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${backend_url}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function fetchUploadFile(url: string, data: FormData) {
  try {
    const res = await fetch(`${backend_url}/${url}`, {
      method: 'POST',
      body: data,
    })

    if (res.ok) {
      const data = await res.json()
      return data
    } else {
      throw new Error('File upload failed')
    }
  } catch (e) {
    console.error('Error uploading file:', e)
  }
}
