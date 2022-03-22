import { ref, reactive } from 'vue'
const userInfo = reactive({
  username: '',
  signature: '',
  avatar: '',
})
const showEditAvatar = ref(false)
const showEditSignature = ref(false)
const editSignature = ref('')
export {
  userInfo,
  showEditAvatar,
  showEditSignature,
  editSignature,
}
