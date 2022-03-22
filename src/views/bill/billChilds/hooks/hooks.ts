import { getBillList } from '@/api/bill'
import {
  billList,
  currentPage,
  listFinished,
  listLoading,
  listRefreshing,
  selectedDate,
  selectedType,
  total,
  totalPage,
} from './store'

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

export { onRefresh, onLoad, changeBillItem }
