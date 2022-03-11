import { ref, reactive } from 'vue'
import { Bill, BillType } from './types'
import { getBillList } from '../../../../network/bill'
import { selectedDate } from '../../../../components/common/totalDate/hooks/store'

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
  expense: 10,
  income: 10,
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

// 重置参数
const initParam = () => {
  listLoading.value = true
  listFinished.value = false
  billList.value = []
  totalPage.value = 0
  currentPage.value = 1
}

// 请求账单列表数据
const getBillListRequest = async () => {
  const params = {
    date: Number(selectedDate.value),
    page: currentPage.value,
    page_size: 5,
    type_id: selectedType.id, //对应type请求类型
  }
  try {
    const { code, data } = await getBillList(params)
    if (code === 200) {
      billList.value.push(...data.list)
      total.expense = data?.total_expense || 0
      total.income = data?.total_income || 0
      totalPage.value = data?.total_page || 0
    }
  } catch (error) {
    console.log('error:', error)
  } finally {
    if (currentPage.value < totalPage.value) {
      currentPage.value += 1
    } else {
      listFinished.value = true
    }
    listLoading.value = false
  }
}

// 下拉刷新重新加载
const onRefresh = async () => {
  initParam()
  await getBillListRequest()
  listRefreshing.value = false
}

//进入页面加载完成后加载
const onLoad = async () => {
  initParam()
  await getBillListRequest()
}

// 添加、删除、更新账单数据后重新加载数据
const changeBillItem = () => {
  initParam()
  getBillListRequest()
}

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
  onRefresh,
  onLoad,
  changeBillItem,
}
