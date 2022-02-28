<script lang="ts" setup>
import dayjs from 'dayjs'
import { nextTick, onMounted, watch } from 'vue'

import {
  dateType,
  dateTitle,
  showCountDate,
  selectedCountDate,
} from '@/components/common/totalDate/hooks/store'

import { countPayType, countMonthBill, initChart } from './hooks/store'

import { getMonthBillData } from '@/network/count'

import TotalDate from '@/components/common/totalDate/TotalDate.vue'

const showDateFn = () => {
  showCountDate.value = true
  dateType.value = 'year-month'
  dateTitle.value = '选择年月'
}

watch(selectedCountDate, () => {
  getMonthBillDataRequest(countPayType.value)
})

const getMonthBillDataRequest = async () => {
  try {
    const { code, data } = await getMonthBillData(
      selectedCountDate.value.getTime()
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
        {{ dayjs(selectedCountDate).format('YYYY-MM') }}
        <van-icon name="arrow-down" />
      </span>
    </div>

    <div class="type">
      <div
        class="base"
        :class="countPayType === 'expense' ? 'expense' : 'inactive'"
      >
        <span>共支出</span>
        <span>￥{{ countMonthBill.total_expense }}</span>
      </div>
      <div
        class="base"
        :class="countPayType === 'income' ? 'income' : 'inactive'"
      >
        <span>共收入</span>
        <span>￥{{ countMonthBill.total_income }}</span>
      </div>
    </div>
  </header>

  <TotalDate
    :showDateRead="showCountDate"
    :selectedDateRead="selectedCountDate"
    @close="showCountDate = false"
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
