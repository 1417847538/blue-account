<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

import { total, selectedType, showType } from './hooks/store'

import {
  showDate,
  dateType,
  dateTitle,
  selectedDate,
} from '@/components/common/totalDate/hooks/store'

import TotalDate from '@/components/common/totalDate/TotalDate.vue'
import BillTypes from '@/components/content/billChilds/BillTypes.vue'

const showDateFn = () => {
  showDate.value = true
  dateType.value = 'year-month'
  dateTitle.value = '选择年月'
}
</script>

<template>
  <header>
    <div class="total">
      <div>
        <span>{{ dayjs(selectedDate).format('M') }}月总支出：</span>
        <span class="total-count">￥{{ total.expense }}</span>
      </div>
      <div style="margin-left: 15px">
        <span>{{ dayjs(selectedDate).format('M') }}月总收入：</span>
        <span class="total-count">￥{{ total.income }}</span>
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
        <span @click="showDateFn">
          {{ dayjs(selectedDate).format('YYYY-MM') }}
          <van-icon name="arrow-down"></van-icon>
        </span>
      </div>
    </div>
  </header>

  <BillTypes @close="showType = false" />
  
  <TotalDate
    :showDateRead="showDate"
    :selectedDateRead="selectedDate"
    @close="showDate = false"
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
