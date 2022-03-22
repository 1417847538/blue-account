<script lang="ts" setup>
import dayjs from 'dayjs'
import {
  listRefreshing,
  listLoading,
  listFinished,
  billList,
} from './hooks/store'
import { onRefresh, onLoad } from './hooks/hooks'

import BillLIstItem from './BillLIstItem.vue'

listFinished.value = false
</script>

<template>
  <van-pull-refresh v-model="listRefreshing" @refresh="onRefresh">
    <div class="bill-list">
      <van-list
        v-model:loading="listLoading"
        :finished="listFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <BillLIstItem v-for="bill in billList" :key="bill.date" :bill="bill" />
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<style></style>
