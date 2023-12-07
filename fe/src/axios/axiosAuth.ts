import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('access_token')

const axiosAuth = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export default axiosAuth