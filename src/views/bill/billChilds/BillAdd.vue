<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { showAdd } from './hooks/store'
import { changeBillItem } from './hooks/hooks'

import AddPopup from '@/components/addPopup/AddPopup.vue'

const defaultData = reactive({})
const addChange = () => {
  showAdd.showAdd = false
  changeBillItem()
}
</script>

<template>
  <!-- bill页面点击增加的按钮 -->
  <div class="bill-add">
    <van-button round plain size="large" @click="showAdd.showAdd = true">
      <van-icon name="records" size="32" color="#007fff" />
    </van-button>
  </div>

  <AddPopup
    @close="showAdd.showAdd = false"
    :defaultData="defaultData"
    :showAddRead="showAdd"
    @addChange="addChange"
    ref="addPopup"
  />
</template>

<style lang="less" scoped>
.bill-add {
  z-index: 99;
  position: fixed;
  bottom: 70px;
  right: 16%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 rgb(121, 156, 221);
}
</style>
