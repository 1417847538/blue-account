<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, shallowRef, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import Tabbar from '@/components/common/tabbar/Tabbar.vue'

const showTabber = ref(true)
const route = useRoute()

const noShowTabbarRouteList = [
  '/login',
  '/billItem',
  '/update-password',
  '/upload-avatar',
]

watchEffect(() => {
  showTabber.value = !noShowTabbarRouteList.includes(route.path)
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
