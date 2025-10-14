import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/',
  baseURL: 'https://onebigmediacompany.online/',
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Auth token added to request:', config.url, token.substring(0, 20) + '...')
    } else {
      console.log('No auth token found for request:', config.url)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
