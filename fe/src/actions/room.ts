'use server'

import { endpoint } from "@/lib/constant"
import { fetchDataWithAuthParam, postDataWithAuth } from "@/services/fetch/fetchApi"

export const getRoomTwoUser = async(data: number) => {
  const res = await fetchDataWithAuthParam(endpoint.search_rooms, data)
  return res
}

export const createRoomTwoUser = async(data: any) => {
  const res = await postDataWithAuth(endpoint.rooms, data)
  return res
}