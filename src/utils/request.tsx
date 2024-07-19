import axios, { AxiosError } from 'axios'
import storage from './storage'

// Create an axios instance
const instance = axios.create({
  baseURL: 'https://d36efld3pkkz5f.cloudfront.net/api',
  timeout: 10000,
  timeoutErrorMessage: 'Request Timeout',
  withCredentials: true
})

// Request interceptors
instance.interceptors.request.use(
  config => {
    const accessToken = storage.get('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptors
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'token_not_valid'
    ) {
      storage.remove('accessToken')
      storage.remove('refreshToken')
      // Redirect to login page
      window.location.href = '/#/signin'
    }

    return Promise.reject(error)
  }
)

// Export the axios instance
export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, params)
  },
  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params)
  }
}
