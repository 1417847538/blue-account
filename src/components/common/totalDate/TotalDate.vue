<script lang="ts" setup>
import { ref } from 'vue'
import { changeBillItem } from '@/components/content/billChilds/hooks/store'

import {
  dateType,
  dateTitle,
  showDate,
  selectedDate,
  showAddDate,
  selectedAddDate,
  showCountDate,
  selectedCountDate,
} from './hooks/store'
import { showAdd } from '../addPopup/hooks/store'


let { showDateRead, selectedDateRead } = defineProps<{
  showDateRead: Boolean
  selectedDateRead: Date
}>()

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
const dateChange = (date: Date, page: string) => {
  // 如果是bill页面
  if (showDate.value) {
    showDate.value = false
    selectedDate.value = date
    changeBillItem()
    // 如果是billItem页面
  } else if (showAddDate.value) {
    showAddDate.value = false
    selectedAddDate.value = date
    // 如果是count页面
  } else if (showCountDate.value) {
    showCountDate.value = false
    selectedCountDate.value = date
  }
}
</script>

<template>
  <van-popup v-model:show="showDateRead" position="bottom" round>
    <van-datetime-picker
      style="margin: 10px"
      :type="dateType"
      :title="dateTitle"
      v-model="selectedDateRead"
      @cancel="showDateRead = false"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @confirm="(date:Date)=>dateChange(date)"
    />
  </van-popup>
</template>
<style></style>
