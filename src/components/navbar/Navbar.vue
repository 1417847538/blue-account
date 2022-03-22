<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const { title } = defineProps<{
  title: string
}>()

const back = () => {
  router.back()
}
</script>

<template>
  <van-nav-bar left-text="返回" :title="title" left-arrow @click-left="back" />
</template>

<style lang="less" scoped></style>
