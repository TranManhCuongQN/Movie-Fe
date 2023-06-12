import axios from 'axios'
import queryString from 'query-string'

const baseURL = 'http://127.0.0.1:5000/api/v1/'
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params)
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data
    return response
  },
  (error) => {
    throw error.response.data
  }
)

export default axiosClient