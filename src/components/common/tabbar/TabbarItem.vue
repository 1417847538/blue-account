<script setup lang="ts">
import { useRouter } from 'vue-router'

let { item } = defineProps<{
  item: {
    title: string
    icon: string
    path: string
  }
}>()

const router = useRouter()
</script>

<template>
  <van-tabbar-item :icon="item.icon" :to="item.path">
    {{ item.title }}
  </van-tabbar-item>
</template>

<style lang="less" scoped></style>
