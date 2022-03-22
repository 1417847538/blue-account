import { request } from './request'

interface editParams {
  signature?: string
  avatar?: string
}

interface updatePasswordParams {
  oldPassword: string
  newPassword: string
}
// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/get',
    method: 'get',
  })
}
//修改用户个性签名/头像
export function editUserInfo(params: editParams) {
  return request({
    url: '/user/edit',
    method: 'put',
    data: params,
  })
}

// 修改密码
export function updatePassword(params: updatePasswordParams) {
  return request({
    url: '/user/update_password',
    method: 'put',
    data: params,
  })
}
