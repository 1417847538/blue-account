import { ref, reactive } from 'vue'
// 展示类型
const dateType = ref('')
const dateTitle = ref('')

// 是否显示时间选择组件
const showDate = ref(false)
const showAddDate = ref(false)
const showCountDate = ref(false)

// 初始时间
const selectedDate = ref<Date>(new Date())
const selectedAddDate = ref<Date>(new Date())
const selectedCountDate = ref<Date>(new Date())
export {
  dateType,
  dateTitle,
  showDate,
  showAddDate,
  showCountDate,
  selectedDate,
  selectedAddDate,
  selectedCountDate,
}
