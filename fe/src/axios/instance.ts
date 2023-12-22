import { backend_url } from '@/lib/constant'
import axios from 'axios'

const axiosInstanceNonAuth = axios.create({
  baseURL: backend_url,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstanceNonAuth.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data)
  },
)

const axiosInstanceAuth = axios.create({
  baseURL: backend_url,
  headers: {
    'Content-Type': 'application/json',
  },
})

const axiosCustom = axios.create({
  baseURL: backend_url,
  headers: { 'Content-Type': 'application/json' },
})

export { axiosInstanceNonAuth, axiosInstanceAuth, axiosCustom }
