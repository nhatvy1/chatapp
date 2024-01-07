'use server'

import { endpoint } from '@/lib/constant'
import { fetchUploadFile } from '@/services/fetch/fetchApi'

export const registerAction = async (data: FormData) => {
  const res = fetchUploadFile(endpoint.register, data)
  return res
}
