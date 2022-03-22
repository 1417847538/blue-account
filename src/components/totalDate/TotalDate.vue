<script lang="ts" setup>
import { ref, toRef, watch } from 'vue'

import { dateType, dateTitle } from './hooks/store'

const { showDate, selectedDate } = defineProps<{
  showDate: Boolean
  selectedDate: Date
}>()

const emit = defineEmits(['dateChange'])
// 最早为 2022 年 1 月 1 日
const minDate = ref(new Date(2021, 0, 1))
// 最迟为当前时间
const maxDate = ref(new Date())

const formatter = (
  type: 'year' | 'month' | 'day' | 'hour' | 'minute',
  value: number
) => {
  if (type === 'year') {
    return `${value}年`
  }
  if (type === 'month') {
    return `${value}月`
  }
  if (type === 'day') {
    return `${value}日`
  }
}

// 选择时间重新请求列表数据
const dateChangeFn = (date: Date) => {
  emit('dateChange', date)
}

defineExpose({
  dateType,
  dateTitle,
})
</script>

<template>
  <van-popup  v-model:show="showDate" position="bottom" round>
    <van-datetime-picker
      style="margin: 10px"
      :type="dateType"
      :title="dateTitle"
      v-model="selectedDate"
      @cancel="showDate = false"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @confirm="(date:Date)=>dateChangeFn(date)"
    />
  </van-popup>
</template>
