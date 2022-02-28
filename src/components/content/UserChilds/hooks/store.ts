import { Toast } from 'vant'
import { ref, reactive } from 'vue'
import { getUserInfo, editUserInfo } from '../../../../network/user'
const userInfo = reactive({
  username: '',
  signature: '',
  avatar: '',
})

const showEditAvatar = ref(false)

const showEditSignature = ref(false)
const editSignature = ref('')

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

export {
  userInfo,
  showEditAvatar,
  showEditSignature,
  editSignature,
  getUserInfoRequest,
  editSignatureRequest,
}
