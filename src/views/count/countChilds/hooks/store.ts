import F2 from '@antv/f2'
import { reactive, ref, computed, nextTick } from 'vue'

import { GetMonthBillDataResponse } from '@/api/count'

const countPayType = ref<'expense' | 'income'>('expense')
const countMonthBill = reactive<GetMonthBillDataResponse>({
  expense_list: [],
  income_list: [],
  total_expense: 0,
  total_income: 0,
})
const showDate = ref(false)
const selectedDate = ref(new Date())

const chooseCountPayType = (type: 'expense' | 'income') => {
  countPayType.value = type
  // 先渲染dom,再执行函数
  nextTick(() => {
    initChart(type)
  })
}

const countTotal = computed(() => {
  return countPayType.value === 'expense'
    ? countMonthBill.total_expense
    : countMonthBill.total_income
})

const expenseClass = computed(() => {
  return countPayType.value === 'expense' ? 'button-expense-actived' : ''
})

const incomeClass = computed(() => {
  return countPayType.value === 'income' ? 'button-income-actived' : ''
})

const billList = computed(() => {
  return countPayType.value === 'expense'
    ? countMonthBill.expense_list
    : countMonthBill.income_list
})

// 初始化环形图
const initChart = (type: 'expense' | 'income') => {
  if (!countTotal.value) return
  const map: { [key: string]: string } = {}
  const data: { type_name: string; percent: number; a: string }[] = []
  billList.value.forEach((item) => {
    let percent = ((item.total_amount / countTotal.value) * 100).toFixed(2)
    map[item.type_name] = percent + '%'
    data.push({
      type_name: item.type_name,
      percent: Number(percent),
      a: '1',
    })
  })

  const chart = new F2.Chart({
    id: 'chart',
    pixelRatio: window.devicePixelRatio,
    padding: [5, 'auto'],
  })

  chart.source(data, {
    percent: {
      formatter: (val) => {
        return val + '%'
      },
    },
  })
  // chart.tooltip(true)
  chart.legend({
    position: 'right',
    itemFormatter: (val) => {
      return val + '    ' + map[val]
    },
  })

  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.7,
    radius: 0.85,
  })
  chart.axis(false)
  chart
    .interval()
    .position('a*percent')
    .color(
      'type_name',
      type == 'expense'
        ? ['#683df4', '#131ef4', '#136df4', '#13a9f4', '#13edf4', '#13f4ad']
        : ['#ed1710', '#f76260', '#ff470a', '#f96d3e', '#d36e1b', '#f7b34c']
    )
    .adjust('stack')

  chart.guide().text({
    position: ['50%', '50%'],
    content: `￥${countTotal.value}`,
    style: {
      fill: '#1890FF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  })
  chart.render()
}

export {
  countPayType,
  countMonthBill,
  showDate,
  selectedDate,
  expenseClass,
  incomeClass,
  chooseCountPayType,
  countTotal,
  billList,
  initChart,
}
