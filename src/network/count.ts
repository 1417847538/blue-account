import { request } from './request'

interface Item {
  total_amount: number
  type_name: string
  type_id: number
}

export interface GetMonthBillDataResponse {
  expense_list: Item[] | []
  income_list: Item[] | []
  total_expense: number
  total_income: number
}
// 获取每个月统计账单
export function getMonthBillData(date: number) {
  return request<GetMonthBillDataResponse>({
    url: '/bill/date',
    params: {
      date,
    },
    method: 'get',
  })
}
