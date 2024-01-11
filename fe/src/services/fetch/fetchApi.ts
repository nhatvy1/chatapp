import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { backend_url } from '@/lib/constant'
import { getServerSession } from 'next-auth'

export async function fetchDataWithAuth(url: string) {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${backend_url}/${url}`, {
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

export async function fetchDataWithAuthParam<T>(url: string, data: number | null) {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${backend_url}/${url}/${data}`, {
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
    throw new Error('Upload file failed')
  }
}

export async function postDataWithAuth<T>(url: string, data: T) {
  const session = await getServerSession(authOptions)
  try {
    const res = await fetch(`${backend_url}/${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${session?.access_token}`,
      }
    })

    if(res.ok) {
      const data = await res.json()
      return data
    } 
  } catch(e) {
    throw new Error('Post data failed')
  }
}