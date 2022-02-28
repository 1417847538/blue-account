<script lang="ts" setup>
import { useRouter } from 'vue-router'

import {
  expenseClass,
  incomeClass,
  chooseCountPayType,
  countPayType,
  countTotal,
} from './hooks/store'

import CountChart from '@/components/content/countChilds/CountChart.vue'

const router = useRouter()
</script>

<template>
  <main>
    <div class="title">收支构成</div>
    <div class="button">
      <span :class="expenseClass" @click="chooseCountPayType('expense')"
        >支出</span
      >
      <span :class="incomeClass" @click="chooseCountPayType('income')"
        >收入</span
      >
    </div>

    <CountChart v-if="countTotal" />

    <!-- 如果统计的数据为0 -->
    <van-empty
      :description="`暂无${countPayType === 'expense' ? '支出' : '收入'}账单`"
      v-if="!countTotal"
    >
      <van-button
        round
        type="warning"
        class="add-button"
        @click="router.push('/bill')"
      >
        去添加
      </van-button>
    </van-empty>
  </main>
</template>

<style lang="less" scoped>
main {
  padding: 10px 16px;
  .title {
    font-size: 20px;
    color: rgb(85, 83, 184);
    font-weight: 800;
    text-align: center;
    text-shadow: 3px 3px 4px rgb(78, 182, 238);
  }
  .button {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    span {
      margin: 0 10px;
      padding: 2px 11px;
      font-size: 14px;
      background-color: #f5f5f5;
      border: 0.5px solid #f5f5f5;
      color: rgba(0, 0, 0, 0.5);
    }
    .button-expense-actived {
      background-color: #eafbf6;
      color: #007fff;
      border: 0.5px solid #007fff;
    }

    .button-income-actived {
      background-color: #fbf8f0;
      color: #f32b1d;
      border: 0.5px solid #f32b1d;
    }
  }

  .add-button {
    width: 160px;
    height: 40px;
  }
}
</style>
