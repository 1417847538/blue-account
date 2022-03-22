import { getUserInfo, editUserInfo } from '@/api/user'
import { Toast } from 'vant'
import { userInfo, editSignature, showEditSignature } from './store'

// 获取用户信息
const getUserInfoRequest = async () => {
  const { data } = await getUserInfo()
  Object.assign(userInfo, data)
}

// 修改个性签名
const editSignatureRequest = async () => {
  try {
    const { code, data } = await editUserInfo({
      signature: editSignature.value,
    })
    if (code === 200) {
      Toast.success('修改成功')
      userInfo.signature = data.signature
      if (editSignature.value === '') {
        userInfo.signature = ''
      }
    }
  } catch (error) {
    console.log('error:', error)
  } finally {
    showEditSignature.value = false
    editSignature.value = ''
  }
}
export { getUserInfoRequest, editSignatureRequest }
