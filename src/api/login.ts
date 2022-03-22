import { request } from './request'

export interface loginMessage {
  username: string
  password: string
}

interface LoginData {
  token: string
}

// 登录
export function login(params: loginMessage) {
  return request<LoginData>({
    url: '/user/login',
    method: 'post',
    data: params,
  })
}

// 注册
export function register(params: loginMessage) {
  return request({
    url: '/user/register',
    method: 'post',
    data: params,
  })
}
