<script lang="ts" setup>
import { ref, readonly } from 'vue'
import dayjs from 'dayjs'

import {
  total,
  selectedType,
  showType,
  showDate,
  selectedDate,
} from './hooks/store'

import { changeBillItem } from './hooks/hooks'

import TotalDate from '@/components/totalDate/TotalDate.vue'
import BillTypes from './BillTypes.vue'

const totalDate = ref()

const showTotalDate = () => {
  showDate.value = true
  totalDate.value.dateType = 'year-month'
  totalDate.value.dateTitle = '选择年月'
}

const dateChange = (date: Date) => {
  showDate.value = false
  selectedDate.value = date
  changeBillItem()
}
</script>

<template>
  <header>
    <div class="total">
      <div>
        <span>{{ dayjs(selectedDate).format('M') }}月总支出：</span>
        <span class="total-count">￥{{ total.expense.toFixed(2) }}</span>
      </div>
      <div style="margin-left: 15px">
        <span>{{ dayjs(selectedDate).format('M') }}月总收入：</span>
        <span class="total-count">￥{{ total.income.toFixed(2) }}</span>
      </div>
    </div>

    <div class="select-type-date">
      <div>
        <span @click="showType = true">
          {{ selectedType.name }}
          <van-icon name="arrow-down"></van-icon>
        </span>
      </div>
      <div style="margin-left: 10px">
        <span @click="showTotalDate">
          {{ dayjs(selectedDate).format('YYYY-MM') }}
          <van-icon name="arrow-down"></van-icon>
        </span>
      </div>
    </div>
  </header>

  <BillTypes @close="showType = false" />

  <TotalDate
    :showDate="showDate"
    :selectedDate="selectedDate"
    @close="showDate = false"
    @dateChange="dateChange"
    ref="totalDate"
  />
</template>

<style lang="less" scoped>
header {
  background-color: #007fff;
  color: #fff;
  font-size: 14px;
  .total {
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px;
    .total-count {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .select-type-date {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px 8px;
    div {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 30px;
      padding: 2px 10px;
    }
  }
}
</style>
