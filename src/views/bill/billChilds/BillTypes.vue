<script lang="ts" setup>
import { ref, computed } from 'vue'
import { types, showType, selectedType } from './hooks/store'
import { changeBillItem } from './hooks/hooks'

import type { BillType } from './hooks/types'

const dividerStyle = {
  fontSize: '18px',
  color: '#000000',
  borderColor: '#1989fa',
}

const selectedTypeId = ref(0)

const chooseType = (obj: BillType) => {
  selectedTypeId.value = obj.id
  showType.value = false
  Object.assign(selectedType, obj)
  changeBillItem()
}

const expenseTypes = computed(() => {
  return types.filter((item) => item.type === 1)
})
const incomeTypes = computed(() => {
  return types.filter((item) => item.type === 2)
})
</script>

<template>
  <van-popup v-model:show="showType" position="bottom" round>
    <div class="bill-types">
      <div class="types-header">请选择类型</div>
      <van-divider :style="dividerStyle" />

      <div class="types-body">
        <van-button
          class="type-button"
          :type="selectedTypeId === 0 ? 'primary' : 'default'"
          @click="chooseType({ id: 0, name: '全部类型' })"
        >
          全部类型
        </van-button>

        <van-divider :style="dividerStyle">支出</van-divider>
        <div class="types-body-items">
          <van-button
            class="type-button"
            v-for="type in expenseTypes"
            :key="type.id"
            :type="selectedTypeId === type.id ? 'primary' : 'default'"
            @click="chooseType(type)"
          >
            {{ type.name }}
          </van-button>
        </div>

        <van-divider :style="dividerStyle">收入</van-divider>
        <van-button
          class="type-button"
          v-for="type in incomeTypes"
          :key="type.id"
          :type="selectedTypeId === type.id ? 'primary' : 'default'"
          @click="chooseType(type)"
        >
          {{ type.name }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<style lang="less" scoped>
.bill-types {
  font-size: 18px;
  background-color: #f5f5f5;
  .types-header {
    padding: 10px 0;
    text-align: center;
  }
  .types-body {
    padding: 0 10px 10px;
    .type-button {
      width: 30%;
      margin: 5px 1%;
    }
    .types-body-items {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
}
</style>
