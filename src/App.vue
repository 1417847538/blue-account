<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { preLoad } from '@/utils/preload'
import Tabbar from '@/components/common/tabbar/Tabbar.vue'

const route = useRoute()
// 图片预加载
preLoad()

const noShowTabbarRouteList = [
  '/login',
  '/billItem',
  '/update-password',
  '/update-avatar',
]

const showTabber = computed(() => {
  return !noShowTabbarRouteList.includes(route.path)
})
</script>

<template>
  <div class="app">
    <router-view />
    <Tabbar v-if="showTabber" />
  </div>
</template>

<style lang="less" scoped>
.app {
  min-height: 100vh;
  font-size: 12px;
}
</style>
