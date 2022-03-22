import { request } from './request'
import { Bill, BillItem } from '../components/content/billChilds/hooks/types'

interface GetBillListRequest {
  date: number
  page: number
  page_size?: number
  type_id?: number
}

interface GetBillListResponse {
  total_expense: number
  total_income: number
  total_page: number
  list: Bill[]
}

// 获取账单列表
export function getBillList(params: GetBillListRequest) {
  return request<GetBillListResponse>({
    url: '/bill/list',
    params,
    method: 'get',
  })
}

// 删除账单列表某个事件
export function deleteBillItem(id: number) {
  return request({
    url: '/bill/delete',
    params: {
      id,
    },
    method: 'delete',
  })
}
// 增加账单列表某个事件
export function addBillItem(params: BillItem) {
  return request({
    url: '/bill/add',
    data: params,
    method: 'post',
  })
}
// 请求详情页数据
export function getBillItem(id: number) {
  return request({
    url: '/bill/detail',
    params: {
      id,
    },
    method: 'get',
  })
}
// 更新某个事件
export function updateBillItem(params: BillItem) {
  return request({
    url: '/bill/update',
    data: params,
    method: 'put',
  })
}
