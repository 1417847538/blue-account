<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref, nextTick, onMounted, watch, readonly } from 'vue'

import {
  countPayType,
  countMonthBill,
  showDate,
  selectedDate,
  initChart,
} from './hooks/store'

import { getMonthBillData } from '@/api/count'
import TotalDate from '@/components/totalDate/TotalDate.vue'

const totalDate = ref()

const showDateFn = () => {
  showDate.value = true
  totalDate.value.dateType = 'year-month'
  totalDate.value.dateTitle = '选择年月'
}

const dateChange = (date: Date) => {
  showDate.value = false
  selectedDate.value= date
  getMonthBillDataRequest(countPayType.value)
}

const getMonthBillDataRequest = async () => {
  try {
    const { code, data } = await getMonthBillData(
      selectedDate.value.getTime()
    )
    if (code === 200) {
      Object.assign(countMonthBill, data)
    }
  } catch (error) {
    console.log('error:' + error)
  } finally {
    nextTick(() => {
      initChart(countPayType.value)
    })
  }
}

onMounted(() => {
  getMonthBillDataRequest()
})
</script>

<template>
  <header>
    <div>
      <span class="date" @click="showDateFn">
        {{ dayjs(selectedDate).format('YYYY-MM') }}
        <van-icon name="arrow-down" />
      </span>
    </div>

    <div class="type">
      <div
        class="base"
        :class="countPayType === 'expense' ? 'expense' : 'inactive'"
      >
        <span>共支出</span>
        <span>￥{{ countMonthBill.total_expense.toFixed(2) }}</span>
      </div>

      <div
        class="base"
        :class="countPayType === 'income' ? 'income' : 'inactive'"
      >
        <span>共收入</span>
        <span>￥{{ countMonthBill.total_income.toFixed(2) }}</span>
      </div>
    </div>
  </header>

  <TotalDate
    :showDate="showDate"
    :selectedDate="selectedDate"
    ref="totalDate"
    @dateChange="dateChange"
    @close="showDate = false"
  />
</template>

<style lang="less" scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 0;
  font-size: 14px;
  font-weight: 500;
  .date {
    background-color: #f5f5f5;
    font-size: 16px;
    padding: 6px;
  }
  .type {
    display: flex;
    margin-top: 20px;
    .base {
      display: flex;
      margin: 0 40px;
      flex-direction: column;
      align-items: center;
      span:nth-child(1) {
        margin-right: -5px;
      }
      span:nth-child(2) {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .inactive {
      color: rgba(0, 0, 0, 0.563);
    }
    .expense {
      color: #007fff;
    }
    .income {
      color: #f32b1d;
    }
  }
}
</style>
