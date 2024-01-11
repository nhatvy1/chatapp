'use server'

import { endpoint } from "@/lib/constant"
import { fetchDataWithAuthParam } from "@/services/fetch/fetchApi"

export const getMessageByRoomId = async(data: number) => {
  const res = await fetchDataWithAuthParam(endpoint.messages, data)
  return res
}