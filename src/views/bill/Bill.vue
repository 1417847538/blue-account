<script lang="ts" setup>
import BillHeader from './billChilds/BillHeader.vue'
import BillList from './billChilds/BillList.vue'
import BillAdd from './billChilds/BillAdd.vue'
</script>

<template>
  <div class="bill">
    <BillHeader />
    <BillList />
    <BillAdd />
  </div>
</template>

<style lang="less" scoped></style>
