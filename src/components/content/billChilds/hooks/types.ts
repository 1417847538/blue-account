// 显示账单类型
export interface BillType {
  id: number
  name: string
  // 1为支出，2为收入
  type?: 1 | 2
}

// 账单的单条记录
export interface BillItem {
  id?: number
  pay_type?: 1 | 2
  //消费金额
  amount?: string
  date?: string
  remark?: string
  type_id?: number
  type_name: string
}

// 账单全部记录
export interface Bill {
  date: string
  bills: BillItem[]
}
