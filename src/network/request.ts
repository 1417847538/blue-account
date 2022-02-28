import axios, { AxiosRequestConfig } from 'axios'
import { Toast } from 'vant'

interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}
// 环境变量
const MODE = import.meta.env.MODE

const instance = axios.create({
  baseURL: '/api',
})

export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<ResponseData<T>> => {
  instance.interceptors.request.use((config) => {
    if (config?.headers) {
      config.headers.Authorization = localStorage.getItem('token') || ''
    }
    return config
  })

  const { data } = await instance.request<ResponseData<T>>(config)
  if (typeof data !== 'object') {
    Toast.fail('服务器异常！')
    return Promise.reject(data)
  }
  if (data.code !== 200) {
    // 错误信息
    if (data.message) Toast.fail(data.message)
    // 错误token,跳回login
    if (data.code === 401) {
      localStorage.removeItem('token')
      location.href = '#/login'
    }
    return Promise.reject(data)
  }

  return data
}
