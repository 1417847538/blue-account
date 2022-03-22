import { ref, reactive } from 'vue'
import { Bill, BillType } from './types'

let types = reactive<BillType[]>([])
types = [
  {
    id: 1,
    name: '餐饮',
    type: 1,
  },
  {
    id: 2,
    name: '交通',
    type: 1,
  },
  {
    id: 3,
    name: '娱乐',
    type: 1,
  },
  {
    id: 4,
    name: '购物',
    type: 1,
  },
  {
    id: 5,
    name: '其他',
    type: 1,
  },
  {
    id: 6,
    name: '工资',
    type: 2,
  },
  {
    id: 7,
    name: '奖金',
    type: 2,
  },
  {
    id: 8,
    name: '转账',
    type: 2,
  },
  {
    id: 9,
    name: '理财',
    type: 2,
  },
  {
    id: 10,
    name: '其他',
    type: 2,
  },
]

// 记录支出总金额和收入总金额
const total = reactive({
  expense: 0,
  income: 0,
})
const totalPage = ref(0) //总页数
const currentPage = ref(1) //当前页
// 初始类型
const selectedType = reactive({
  id: 0,
  name: '全部类型',
})

const billList = ref<Bill[]>([]) //账单列表

const listLoading = ref(false) // 账单列表加载状态
const listFinished = ref(false) // 账单列表是否已加载完毕
const listRefreshing = ref(false) // 账单列表是否正在刷新

const showType = ref(false)

const showDate = ref(false)
const selectedDate = ref(new Date())

const showAdd = reactive({ showAdd: false })
export {
  types,
  total,
  totalPage,
  currentPage,
  selectedType,
  billList,
  listLoading,
  listFinished,
  listRefreshing,
  showType,
  showDate,
  selectedDate,
  showAdd,
}
