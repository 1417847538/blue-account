<script setup lang="ts">
import { ref } from 'vue'

import TabbarItem from './TabbarItem.vue'
const active = ref(0)

const arr = [
  {
    title: '账单',
    icon: 'orders-o',
    path: '/bill',
  },
  {
    title: '统计',
    icon: 'bar-chart-o',
    path: '/count',
  },
  {
    title: '我的',
    icon: 'contact',
    path: '/user',
  },
]
</script>

<template>
  <van-tabbar route v-model="active">
    <TabbarItem v-for="(item, index) in arr" :key="index" :item="item" />
  </van-tabbar>
</template>

<style lang="less" scoped></style>
