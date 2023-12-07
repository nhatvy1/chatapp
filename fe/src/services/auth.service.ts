import axios from 'axios'
import { API_BASE_URL } from '../utils/constant'

export const login = async ({ email, password }: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    })
    return response
  } catch {
    return {
      statusCode: '401',
      message: 'Email hoặc mật khẩu không hợp lệ',
    }
  }
}
