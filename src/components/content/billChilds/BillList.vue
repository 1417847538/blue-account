<script lang="ts" setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import {
  listRefreshing,
  listLoading,
  listFinished,
  billList,
  onRefresh,
  onLoad,
} from '@/components/content/billChilds/hooks/store'

import BillLIstItem from '@/components/content/billChilds/BillLIstItem.vue'
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
