<script lang="ts" setup>
import CountHeader from '@/components/content/countChilds/CountHeader.vue'
import CountMain from '@/components/content/countChilds/CountMain.vue'
</script>

<template>
  <div class="count">
    <CountHeader />
    <div class="divider" />
    <CountMain />
  </div>
</template>

<style lang="less" scoped>
.count {
  .divider {
    margin: 10px 0;
    height: 6px;
    opacity: 0.6;
    background-image: linear-gradient(to right, blue, rgb(255, 0, 191), red);
  }
}
</style>
