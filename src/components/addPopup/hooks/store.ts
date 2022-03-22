import { ref, computed, reactive } from 'vue'
import { types } from '@/views/bill/billChilds/hooks/store'

import type { BillType } from '@/views/bill/billChilds/hooks/types'

const type_pay = ref('expense') //支付/收入
const billType = reactive<BillType>({
  id: 0,
  name: '',
})

const remark = ref('') //备注
const amount = ref('') //账单金额

const showDate = ref(false)
const selectedDate = ref(new Date())

const expenseClass = computed(() => {
  return type_pay.value === 'expense' ? 'button-expense-actived' : ''
})
const incomeClass = computed(() => {
  return type_pay.value === 'income' ? 'button-income-actived' : ''
})

const choosePayType = (type: string) => {
  type_pay.value = type
  billType.id = showTypes.value[0].id
  billType.name = showTypes.value[0].name
  amount.value = ''
  remark.value = ''
}

const showTypes = computed(() => {
  return types.filter(
    (item) => item.type === (type_pay.value === 'expense' ? 1 : 2)
  )
})

const chooseBillType = (type: BillType) => {
  billType.id = type.id
  billType.name = type.name
}

export {
  type_pay,
  billType,
  remark,
  showDate,
  selectedDate,
  amount,
  expenseClass,
  incomeClass,
  choosePayType,
  showTypes,
  chooseBillType,
}
